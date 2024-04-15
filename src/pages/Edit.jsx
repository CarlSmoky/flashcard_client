import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { errorMessage } from "../helpers/messages";
import { handleOnSaveValidation } from "../helpers/validation";
import { updateStatus } from "../helpers/defaultEditableData";
import { useModal } from "../providers/ModalProvider";
import { scrollToTop } from "../helpers/utilities";
import { modes } from "../helpers/modes";
import { confirmationMessage } from "../helpers/messages";
import { postUpdateDeckAndCards } from "../helpers/deckAndCardsHelpers";
import useEditData from "../hooks/useEditData";
import PageLayout from "../components/PageLayout";
import CardForm from "../components/CardForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ModifyWrapper from "../components/ModifyWrapper";
import GenericConfirmation from "../components/GenericConfirmation";
import Button from "../components/Button";

const Edit = () => {
  const {
    createNewCard,
    editCardContents,
    initializeEditableDeckAndCardsById,
    editableDeck,
    setEditableDeck,
    editableCards,
    currentDeck
  } = useEditData();

  let navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();
  const { openModal, closeModal } = useModal();
  const [mode, setMode] = useState(modes.edit.before);
  const [confirmationMsg, setConfirmationMsg] = useState({header: "",text: ""});
  const [error, setError] = useState('');
  const displayedCardForm = editableCards.filter(card => card.updateStatus !== updateStatus.deleted);

  const deleteCardForm = (index) => {
    if (displayedCardForm.length <= 1) { return }
    let card = { ...editableCards[index] };
    card.updateStatus = updateStatus.deleted
    editCardContents(index, card);
  }

  const cardFormItems = editableCards.map((card, index) =>
    <CardForm
      key={index}
      editCardContents={editCardContents}
      card={card}
      index={index}
      deleteCardForm={deleteCardForm}
    />
  );

  const stripCardWithoutId = card => {
    return {
      term: card.term,
      definition: card.definition
    }
  }

  const stripCardWithId = card => {
    return {
      id: card.id,
      term: card.term,
      definition: card.definition
    }
  }

  // Updata deck data
  const updateDeckData = editableDeck.updateStatus === updateStatus.edited ? { id: editableDeck.id, deckName: editableDeck.deckName, description: editableDeck.description } : null;

  // Create card data
  const createdCardsData = editableCards
    .filter(card => card.id === null && card.updateStatus === updateStatus.edited)
    .map(stripCardWithoutId);

  // Updata card data
  const updateCardsData = editableCards
    .filter(card => card.id !== null && card.updateStatus === updateStatus.edited)
    .map(stripCardWithId);

  // Delete card
  const deleteCardsData = editableCards
    .filter(card => card.id !== null && card.updateStatus === updateStatus.deleted)
    .map(stripCardWithId);

  const disableButton = () => {
    return (updateDeckData !== null || updateCardsData.length !== 0 || createdCardsData.length !== 0 || deleteCardsData.length !== 0) ? false : true;
  }

  const handleSaveClick = async (e) => {
  
    if (handleOnSaveValidation(currentDeck)) {
      setError(errorMessage.inputError);
      scrollToTop();
      return;
    }
    openModal()
    setMode(modes.edit.process);
    setConfirmationMsg({
      header: confirmationMessage.edit.process.header,
      text: confirmationMessage.edit.process.text
    })

    const accessToken = await getAccessTokenSilently();
    const {data, error} = await postUpdateDeckAndCards(accessToken, updateDeckData, createdCardsData, updateCardsData, deleteCardsData, id);
    
    if (data) {
      setMode(modes.edit.updated);
      setConfirmationMsg({
        header: confirmationMessage.edit.updated.header,
        text: confirmationMessage.edit.updated.text(data)
      })
      
    } 
    if (error) {
      const isStatusCode409 = error.message.split(" ").indexOf("409") !== -1;
      setMode(modes.edit.error);
      setConfirmationMsg({
        header: confirmationMessage.edit.error.header,
        text: confirmationMessage.edit.error.text(isStatusCode409)
      })
    }
  }

  const updatedConfirmationHandler = () => {
    const path = `/deck/${id}`;
    navigate(path);
    closeModal();
  }

  const errorConfirmationHandler = () => {
    setMode(modes.edit.before)
    const path = `/edit/${id}`;
    navigate(path);
    closeModal();
  }

  useEffect(() => {
    initializeEditableDeckAndCardsById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <PageLayout>
      {mode === modes.edit.process &&
        <GenericConfirmation header={confirmationMsg.header} text={confirmationMsg.text}>
          <LoadingSpinner/>
        </GenericConfirmation>
      }
      {mode === modes.edit.updated &&
        <GenericConfirmation header={confirmationMsg.header} text={confirmationMsg.text}>
          <Button
            text='Ok'
            buttonType="button"
            onButtonClick={updatedConfirmationHandler}
          />
        </GenericConfirmation>
      }
      {mode === modes.create.error &&
        <GenericConfirmation header={confirmationMsg.header} text={confirmationMsg.text}>
          <Button
            text='Ok'
            buttonType="button"
            onButtonClick={errorConfirmationHandler}
          />
        </GenericConfirmation>
      }
      <ModifyWrapper
        error={error}
        deckContents={editableDeck}
        setDeckContents={setEditableDeck}
        cardFormItems={cardFormItems}
        handleOk={updatedConfirmationHandler}
        handleSaveClick={handleSaveClick}
        disableButton={disableButton}
        createNewCard={createNewCard}
        headerText="Edit"
      />
    </PageLayout>
  )
}

export default Edit