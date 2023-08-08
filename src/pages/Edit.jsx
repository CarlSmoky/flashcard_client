import React, { useState } from 'react'
import styled from 'styled-components'
import useApplicationData from '../hooks/useApplicationData'
import DeckDetailsForm from '../components/DeckDetailsForm'
import CardFormHeader from '../components/CardFormHeader'
import CardForm from '../components/CardForm'
import { GrAddCircle } from 'react-icons/gr'
import Button from '../components/Button'
import { handleOnSaveValidation } from '../helpers/validation'
import { defaultEditableDeck, defaultEditableCard, updateStatus } from '../helpers/defaultEditableData'

const Edit = () => {
  const {
    editableDeck,
    editableCards,
    setEditableDeck,
    setEditableCards,
    updateDeckAndCards,
    error,
    setError
  } = useApplicationData();

  const createNewCard = () => {
    setEditableCards(prev => ([...prev, { ...defaultEditableCard }]));
  };

  const editCardContents = (index, cardContents) => {
    const prev = [...editableCards];
    prev[index] = cardContents;
    setEditableCards([...prev]);
  };

  const displayedCardFrom = editableCards.filter(card => card.updateStatus !== updateStatus.deleted);

  const deleteCardForm = (index) => {
    if (displayedCardFrom.length <= 1) { return }

    let card = {...editableCards[index]};
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

  const currentDeck = {
    deckContents: editableDeck,
    cardContents: editableCards,
    setDeckContents: setEditableDeck,
    setCardContents: setEditableCards,
  }

  const handleSaveClick = (e) => {

    if (handleOnSaveValidation(currentDeck)) {

      setError("* Something went wrong. Please check your input.");
      return;
    }
    setError("");

    const stripCardWithoutId = card => {
      return {
        term: card.term,
        definition: card.definition
      }
    }

    const stripCardWithID = card => {
        return {
          id: card.id,
          term: card.term,
          definition: card.definition
        }
      }

    // Updata deck data
    const updateDeckData = editableDeck.updateStatus === updateStatus.edited ? {id: editableDeck.id, deckName: editableDeck.deckName, description: editableDeck.description} : null;
    
    // Create card data
    const createdCardsData = editableCards
    .filter(card => card.id === null && card.updateStatus === updateStatus.edited)
    .map(stripCardWithoutId);
    
    // Updata card data
    const updateCardsData = editableCards
      .filter(card => card.id !== null && card.updateStatus === updateStatus.edited)
      .map(stripCardWithID);

    // Delete card
    const deleteCardsData = editableCards
      .filter(card => card.id !== null && card.updateStatus === updateStatus.deleted)
      .map(stripCardWithID);

    updateDeckAndCards(updateDeckData, createdCardsData, updateCardsData, deleteCardsData);
  };

  return (
    <Wrapper>
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
        <div className='addButton'>
          <button
            onClick={createNewCard}
            type='button'>
            <GrAddCircle />
            <span className="visually-hidden">Add Card Button</span>
          </button>
        </div>
        <Button
          text='Save'
          buttonType='submit'
          onButtonClick={handleSaveClick}
        />
      </form>
    </Wrapper>
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
`

const Wrapper = styled.div`
  min-height: calc(100vh - 9.3rem - 9.3rem);

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
  
  .addButton {
    text-align: right;
  
    button {
      margin: 0 1rem;
      transition: transform 0.2s ease-out;

      &:hover {
        cursor: pointer;
        transform: scaleX(1.2) scaleY(1.2);
      }
    }

    svg {
      font-size: 3rem;
      text-align: left;
    }
  }
`
export default Edit