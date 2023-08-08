import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import DeckDetailsForm from '../components/DeckDetailsForm'
import CardFormHeader from '../components/CardFormHeader'
import CardForm from '../components/CardForm'
import { GrAddCircle } from 'react-icons/gr'
import Button from '../components/Button'
import { handleOnSaveValidation } from '../helpers/validation'
import { defaultEditableDeck, defaultEditableCard } from '../helpers/defaultEditableData'

const Create = () => {
  let navigate = useNavigate();

  const [newDeckContents, setNewDeckContents] = useState({ ...defaultEditableDeck });
  const [newCardContents, setNewCardContents] = useState([{ ...defaultEditableCard }]);
  const [error, setError] = useState('');

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

  const deckContentsForInsertion = {
    deckName: newDeckContents.deckName,
    description: newDeckContents.description
  };

  const cardsContentsForInsertion = newCardContents.map((card) => {
    return {
      term: card.term,
      definition: card.definition
    }
  });

  const handleSaveClick = (e) => {
    // handleOnSaveValidation will return true if there is a problem
    if (handleOnSaveValidation(currentDeck)) {

      setError("* Something went wrong. Please check your input.");
      return;
    }
    setError("");

    // Need to refactor
    const endpoints = {
      "NEWDECK": "api/deck/create"
    }
    //move this function to helper
    const createDeckAndCards = async () => {
      try {
        const response = await axios.post(endpoints.NEWDECK, { newDeckContents: deckContentsForInsertion, newCardContents: cardsContentsForInsertion });

        const path = `/deck/${response.data.deckId}`;
        navigate(path);

      } catch (error) {
        setError(error.response.data.error);
        console.log(error.response.data.error);
      }
    };

    createDeckAndCards();

  };

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
    <Wrapper>
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
        <div className='addButton'>
          <button onClick={createNewCard} type='button'>
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

export default Create