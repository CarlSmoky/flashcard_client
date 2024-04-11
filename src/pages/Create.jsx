import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"
import { useModal } from '../providers/ModalProvider'
import { errorMessage } from '../helpers/messages'
import { handleOnSaveValidation } from '../helpers/validation'
import { defaultEditableDeck, defaultEditableCard } from '../helpers/defaultEditableData'
import { postCreateDeckAndCards } from "../helpers/deckAndCardsHelpers";
import PageLayout from '../components/PageLayout'
import CardForm from '../components/CardForm'
import ModifyWrapper from '../components/ModifyWrapper';
import GenericConfirmation from "../components/GenericConfirmation";
import Button from "../components/Button";

const Create = () => {
  const { getAccessTokenSilently } = useAuth0();
  let navigate = useNavigate();
  const [error, setError] = useState('');
  const [newDeckContents, setNewDeckContents] = useState({ ...defaultEditableDeck });
  const [newCardContents, setNewCardContents] = useState([{ ...defaultEditableCard }]);
  const [updateResult, SetUpdateResult] = useState('');
  const { modalActivated, openModal, closeModal } = useModal();

  const currentDeck = {
    deckContents: newDeckContents,
    setDeckContents: setNewDeckContents,
    cardContents: newCardContents,
    setCardContents: setNewCardContents,
  }

  const createNewCard = () => {
    setNewCardContents(prev => ([...prev, { ...defaultEditableCard }]));
  };

  const editCardContents = (index, cardContents) => {
    const prev = [...newCardContents];
    prev[index] = cardContents;
    setNewCardContents([...prev]);
  };

  const deleteCardForm = (index) => {
    if (newCardContents.length <= 1) { return }
    const prev = [...newCardContents];
    prev.splice(index, 1);
    setNewCardContents([...prev]);
  }

  const handleSaveClick = async (e) => {
    // handleOnSaveValidation will return true if there is a problem
    if (handleOnSaveValidation(currentDeck)) {
      setError(errorMessage.inputError);
      return;
    }
    setError("");
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await postCreateDeckAndCards(accessToken, newDeckContents, newCardContents);
    
    if (data) {
      SetUpdateResult(data);
      openModal();
    } 
    if (error) {
      setError(JSON.stringify(error.message, null, 2));
    }
  };

  const handleOk = () => {
    closeModal();
    const path = `/deck/${updateResult.deckId}`;
    navigate(path);
  }

  const disableButton = () => {
    return false;
  }

  const cardFormItems = newCardContents.map((card, index) =>
    <CardForm
      key={index}
      editCardContents={editCardContents}
      card={card}
      index={index}
      deleteCardForm={deleteCardForm}
    />
  );


  return (
    <PageLayout>
      {modalActivated &&
        <GenericConfirmation text="Created" info={`${updateResult.deckName} is successfully saved`}>
          <Button
            text='Ok'
            buttonType="button"
            onButtonClick={handleOk}
          />
        </GenericConfirmation>
      }
      <ModifyWrapper
        error={error}
        deckContents={newDeckContents}
        setDeckContents={setNewDeckContents}
        cardFormItems={cardFormItems}
        updateResult={updateResult}
        handleOk={handleOk}
        handleSaveClick={handleSaveClick}
        disableButton={disableButton}
        createNewCard={createNewCard}
        headerText="Create"
      />
    </PageLayout>
  )
};

export default Create