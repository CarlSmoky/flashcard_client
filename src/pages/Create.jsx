import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../providers/ModalProvider";
import { errorMessage } from "../helpers/messages";
import { handleOnSaveValidation } from "../helpers/validation";
import { defaultEditableDeck, defaultEditableCard } from "../helpers/defaultEditableData";
import { postCreateDeckAndCards } from "../helpers/deckAndCardsHelpers";
import { modes } from "../helpers/modes";
import { confirmationMessage } from "../helpers/messages";
import { scrollToTop } from "../helpers/utilities";
import PageLayout from "../components/PageLayout";
import Process from "../components/Process";
import ConfirmationWithOk from "../components/ConfirmationWithOk";
import CardForm from "../components/CardForm";
import ModifyWrapper from "../components/ModifyWrapper";

const Create = () => {
  let navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { openModal, closeModal } = useModal();
  const [error, setError] = useState('');
  const [mode, setMode] = useState(modes.create.before);
  const [confirmationMsg, setConfirmationMsg] = useState({ header: "", text: "" });
  const [newDeckContents, setNewDeckContents] = useState({ ...defaultEditableDeck });
  const [newCardContents, setNewCardContents] = useState([{ ...defaultEditableCard }]);
  const [updateResult, SetUpdateResult] = useState('');

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

  useEffect(() => {
    if (mode === modes.create.before) {
      closeModal();
    }
  }, [mode])

  const handleSaveClick = async (e) => {
    if (handleOnSaveValidation(currentDeck)) {
      setError(errorMessage.inputError);
      return;
    }
    openModal();
    setMode(modes.create.process);
    setConfirmationMsg({
      header: confirmationMessage.create.process.header,
    })
    // handleOnSaveValidation will return true if there is a problem

    const accessToken = await getAccessTokenSilently();
    const { data, error } = await postCreateDeckAndCards(accessToken, newDeckContents, newCardContents);

    if (data) {
      SetUpdateResult(data.results);
      setMode(modes.create.updated);
      setConfirmationMsg({
        header: confirmationMessage.create.updated.header,
        text: confirmationMessage.create.updated.text
      })
      scrollToTop();
    }
    if (error) {
      setMode(modes.create.error)
      setError(confirmationMessage.create.error.text(error.message));
      setConfirmationMsg({
        header: confirmationMessage.create.error.header,
        text: confirmationMessage.create.error.text(error.message)
      })
    }
  };

  const handleOk = () => {
    setMode(modes.create.before);
    const path = mode === modes.create.updated ? `/deck/${updateResult.deckId}` : "/create";
    navigate(path);
    closeModal();
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
      {mode === modes.create.process && <Process header={confirmationMsg.header}/>}
      {(mode === modes.create.updated || mode === modes.create.error) && 
        <ConfirmationWithOk header={confirmationMsg.header} text={confirmationMsg.text} handleOk={handleOk} />
      }
      <ModifyWrapper
        error={error}
        deckContents={newDeckContents}
        setDeckContents={setNewDeckContents}
        cardFormItems={cardFormItems}
        updateResult={updateResult}
        handleSaveClick={handleSaveClick}
        disableButton={disableButton}
        createNewCard={createNewCard}
        headerText="Create"
      />
    </PageLayout>
  )
};

export default Create