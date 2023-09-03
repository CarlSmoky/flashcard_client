import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useNavigate } from "react-router-dom"
import DeckDetailsForm from '../components/DeckDetailsForm'
import CardFormHeader from '../components/CardFormHeader'
import CardForm from '../components/CardForm'
import { GrAddCircle } from 'react-icons/gr'
import Button from '../components/Button'
import { handleOnSaveValidation } from '../helpers/validation'
import { defaultEditableDeck, defaultEditableCard } from '../helpers/defaultEditableData'
import { createDeckAndCards } from '../helpers/deckAndCardsHelpers'
import useApplicationData from '../hooks/useApplicationData'
import { useModal } from '../providers/ModalProvider'
import UpdateConfirmation from '../components/UpdateConfirmation'
import { errorMessage } from '../helpers/messages'

const Create = () => {
  const {
    error,
    setError
  } = useApplicationData();

  const [newDeckContents, setNewDeckContents] = useState({ ...defaultEditableDeck });
  const [newCardContents, setNewCardContents] = useState([{ ...defaultEditableCard }]);
  const [newDeck, setNewDeck] = useState('');
  const { modalActivated, openModal, closeModal } = useModal();
  let navigate = useNavigate();

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

  const handleSaveClick = (e) => {
    // handleOnSaveValidation will return true if there is a problem
    if (handleOnSaveValidation(currentDeck)) {
      setError(errorMessage.inputError);
      return;
    }
    setError("");
    createDeckAndCards(newDeckContents, newCardContents, setNewDeck, setError);
    openModal();
  };

  // When deck_title already exists
  useEffect(() => {
    if (error.length > 0 && modalActivated) {
      closeModal();
    } 
  }, [closeModal, error, modalActivated])

  const handleOk = () => {
    closeModal();
    const path = `/deck/${newDeck.deckId}`;
    navigate(path);
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
    <>
      {modalActivated && !error &&
        <UpdateConfirmation
          handleOk={handleOk}
          updateResult={newDeck}
        />}
      <Wrapper className={modalActivated ? 'blur' : null}>
        <Title>Create Deck</Title>
        <div className='error'>
          <p>{error}</p>
        </div>
        <form>
          <DeckDetailsForm
            newDeckContents={newDeckContents}
            setNewDeckContents={setNewDeckContents}
          />
          <CardFormHeader />
          {newCardContents && cardFormItems}
          <div className='addBtnContainer'>
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
            disabled={modalActivated}
          />
        </form>
      </Wrapper>
    </>
  )
};

const Title = styled.h1`
  width: 98%
  font-size: 2rem;
  text-align: left;
  margin: 2rem 0;
  padding: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;
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

export default Create