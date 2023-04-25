import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import DeckDetailsForm from '../components/DeckDetailsForm'
import CardFormHeader from '../components/CardFormHeader'
import CardForm from '../components/CardForm'
import { GrAddCircle } from 'react-icons/gr'
import Button from '../components/Button'

const Create = () => {
  let navigate = useNavigate();

  // Deck
  const defaultDeck = {
    deckName: '',
    description: '',
    errors: {
      deckName: '',
      description: '',
    },
    // if modification is false, the field has never been touched, and needs to be non-emptyy
    modifications: {
      deckName: false,
      description: true, // we can allow unmodified deck descriptions
    }
  };

  //Card
  const defaultCard = {
    term: '',
    definition: '',
    errors:  {
      term: '',
      definition: '',
    },
    modifications: {
      term: false,
      definition: false,
    }
  };
  
  const [newDeckContents, setNewDeckContents] = useState({ ...defaultDeck});
  const [newCardContents, setNewCardContents] = useState([{ ...defaultCard }]);
  const [error, setError] = useState('');

  const createNewCard = () => {
    setNewCardContents(prev => ([...prev, { ...defaultCard }]));
  };

  const editCardContents = (index, cardContents) => {
    const prev = [...newCardContents];
    prev[index] = cardContents;
    setNewCardContents([...prev]);
  };

  const deleteCardForm = (index) => {

    if(index === 0) return;

    const prev = [...newCardContents];
    prev.splice(index, 1);    
    setNewCardContents([...prev]);
  }

  const deckContentsForInsertion = {
    deckName : newDeckContents.deckName,
    description: newDeckContents.description
  };

  const cardsContentsForInsertion = newCardContents.map((card) => {
    return {
      term : card.term,
      definition: card.definition
    }
  });

  // test one card/deck to see if it has error
  const failsValidation = (element) => {
    // fail validation if any field has error OR any field is untouched
    const hasError = Object.values(element.errors).some((errorField) => errorField.length > 0);
    const hasUntouchedField = Object.values(element.modifications).some((modificationField) => !modificationField);
    return hasError || hasUntouchedField;
  }

  const getRequiredUnmodifiedKeys = (element) => {
    return Object.entries(element.modifications)
          .filter(([key, value]) => !value)
          .map(([key,value]) => key )
  }


  const handleOnSaveValidation = () => {
    let hasProblem = false;
    let deckInfo = {...newDeckContents}
    // decks
    if (failsValidation(deckInfo)) {
      hasProblem = true;
      const unmodifiedKeys = getRequiredUnmodifiedKeys(deckInfo);
      unmodifiedKeys.forEach((key) => {
        deckInfo.errors[key] = "Required";
      })
      setNewDeckContents({...deckInfo});
    }

    // cards
    let cardsInfo = [...newCardContents];
    cardsInfo.forEach((card, index) => {
      if (failsValidation(card)) {
        hasProblem = true;
        const unmodifiedKeys = getRequiredUnmodifiedKeys(card);
        unmodifiedKeys.forEach((key) => {
          cardsInfo[index].errors[key] = "Required";
        })
      }
    })
    setNewCardContents([...cardsInfo]);
    
    return hasProblem;
  }


  const handleSaveClick = (e) => {

    if(handleOnSaveValidation()) {
      
      setError("* Something went wrong. Please check your input.");
      return;
    } 
    setError("");

    const endpoints = {
      "NEWDECK": "api/deck/create"
    }

    axios.post(endpoints.NEWDECK, {newDeckContents : deckContentsForInsertion, newCardContents : cardsContentsForInsertion})
      .then(response => {
        let path = `/deck/${response.data.deckId}`;
        navigate(path);
      })
      .catch(err => {
        const error = err.response.data.error;
        setError(error);
        console.log(error);
      })
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

    .visually-hidden:not(:focus):not(:active) {
      clip: rect(0 0 0 0); 
      clip-path: inset(100%); 
      height: 1px; 
      overflow: hidden; 
      position: absolute; 
      white-space: nowrap; 
      width: 1px; 
    }

  }

`

export default Create