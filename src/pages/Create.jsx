import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useModal } from '../providers/ModalProvider'
import { errorMessage } from '../helpers/messages'
import { handleOnSaveValidation } from '../helpers/validation'
import { defaultEditableDeck, defaultEditableCard } from '../helpers/defaultEditableData'
import { createDeckAndCards } from '../helpers/deckAndCardsHelpers'
import CardForm from '../components/CardForm'
import ModifyWrapper from '../components/ModifyWrapper'

const Create = () => {
  let navigate = useNavigate();
  const [error, setError] = useState('');
  const [newDeckContents, setNewDeckContents] = useState({ ...defaultEditableDeck });
  const [newCardContents, setNewCardContents] = useState([{ ...defaultEditableCard }]);
  const [updateResult, SetUpdateResult] = useState('');
  const { openModal, closeModal } = useModal();

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
    const updatedSuccessfully = await createDeckAndCards(newDeckContents, newCardContents, SetUpdateResult, setError);
    if (updatedSuccessfully) {
      openModal();
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
      />
  )
};

export default Create