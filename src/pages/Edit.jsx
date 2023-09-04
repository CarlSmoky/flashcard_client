import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import DeckDetailsForm from '../components/DeckDetailsForm'
import CardFormHeader from '../components/CardFormHeader'
import CardForm from '../components/CardForm'
import { GrAddCircle } from 'react-icons/gr'
import Button from '../components/Button'
import { handleOnSaveValidation } from '../helpers/validation'
import { defaultEditableDeck, updateStatus } from '../helpers/defaultEditableData'
import { useModal } from '../providers/ModalProvider'
import { useNavigate, useParams } from "react-router-dom"
import { scrollToTop } from '../helpers/utilities'
import { updateDeckAndCards } from '../helpers/deckAndCardsHelpers'
import UpdateConfirmation from '../components/UpdateConfirmation'
import { errorMessage } from '../helpers/messages'
import useEditData from '../hooks/useEditData'

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
  const { modalActivated, openModal, closeModal } = useModal();
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
    <>
      {modalActivated &&
        <UpdateConfirmation
          updateResult={editDeckResult}
          handleOk={handleOk}
        />}
      <Wrapper className={modalActivated ? 'blur' : null}>
        <Title>Edit Deck</Title>
        <div className='error'>
          <p>{error}</p>
        </div>
        <form>
          {editableDeck && <DeckDetailsForm
            newDeckContents={editableDeck || defaultEditableDeck}
            setNewDeckContents={setEditableDeck}
          />}
          <CardFormHeader />
          {editableCards && cardFormItems}
          <div className="addBtnContainer">
            <AddButton
              onClick={createNewCard}
              type='button'
              disabled={modalActivated}>
              <GrAddCircle />
              <span className="visually-hidden">Add Card Button</span>
            </AddButton>
          </div>
          <Button
            text='Save'
            buttonType='submit'
            onButtonClick={handleSaveClick}
            disabled={disableButton() || modalActivated}
          />
        </form>
      </Wrapper>
    </>
  )
}

const Title = styled.h1`
  width: 98%
  font-size: 2rem;
  text-align: left;
  margin: 2rem 0;
  padding: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;

  &.blur {
    filter: blur(.6rem);
  }
`

const Wrapper = styled.div`
  min-height: calc(100vh - 9.3rem - 9.3rem);

  &.blur {
    filter: blur(.6rem);
  }

  .error {
    width: 98%;
    height: 2.3rem;
    margin: 1rem auto 0;

    p {
      margin-left: 1rem;
      font-family: var(--tertiary-font);
      font-size: 1.4rem;
      color: red;
      text-align: left;
    }
  }

  .addBtnContainer {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`

const AddButton = styled.button`
  margin-right: 2.1rem;

  svg {
      font-size: 3rem;
      transition: transform 0.2s ease-out;

      ${({ disabled }) => {
    return disabled
      ? css`
        
        `
      : css`
        cursor: pointer;

        &:hover {
        cursor: pointer;
        transform: scaleX(1.2) scaleY(1.2);
        }

        &:active {
          background: var(--white-primary);
          color: var(--black-primary);
        }
      `
  }}
    }
`
export default Edit