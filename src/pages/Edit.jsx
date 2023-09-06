import React, { useState, useEffect } from 'react'
import CardForm from '../components/CardForm'
import { handleOnSaveValidation } from '../helpers/validation'
import { updateStatus } from '../helpers/defaultEditableData'
import { useModal } from '../providers/ModalProvider'
import { useNavigate, useParams } from "react-router-dom"
import { scrollToTop } from '../helpers/utilities'
import { updateDeckAndCards } from '../helpers/deckAndCardsHelpers'
import { errorMessage } from '../helpers/messages'
import useEditData from '../hooks/useEditData'
import ModifyWrapper from '../components/ModifyWrapper'

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
  const { id } = useParams();
  const { openModal, closeModal } = useModal();
  const [error, setError] = useState('');
  const [editDeckResult, setEditDeckResult] = useState({});
  
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
    setError("");
    const updatedSuccessfully = await updateDeckAndCards(updateDeckData, createdCardsData, updateCardsData, deleteCardsData, setEditDeckResult, setError, id);
    if (updatedSuccessfully) {
      openModal();
    }
  };

  const handleOk = () => {
    closeModal();
    const path = `/deck/${id}`;
    navigate(path);
    setEditDeckResult({});
  }

  useEffect(() => {
    initializeEditableDeckAndCardsById(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
      <ModifyWrapper
        error={error}
        editableDeck={editableDeck}
        setEditableDeck={setEditableDeck}
        editableCards={editableCards}
        cardFormItems={cardFormItems}
        updateResult={editDeckResult}
        handleOk={handleOk}
        handleSaveClick={handleSaveClick}
        disableButton={disableButton}
        createNewCard={createNewCard}
      />
  )
}

export default Edit