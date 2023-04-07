import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import DeckDetailsForm from '../components/DeckDetailsForm'
import CreateCardHeader from '../components/CardDetailsHeader'
import CardForm from '../components/CardForm'
import { GrAddCircle } from 'react-icons/gr'
import Button from '../components/Button'

const Create = () => {
  // Deck
  const [newDeckContents, setNewDeckContents] = useState({
    deckName: '',
    description: '',
    errors: {
      deckName: '',
      description: '',
    }
  });
  
  //Card
  const defaultCard = {
    term: '',
    definition: '',
    errors:  {
      term: '',
      definition: '',
    }
  }

  const [newCardContents, setNewCardContents] = useState([{ ...defaultCard }]);

  const createNewCard = () => {
    setNewCardContents(prev => ([...prev, { ...defaultCard }]));
  };

  const editCardContents = (index, cardContents) => {
    const prev = [...newCardContents];
    prev[index] = cardContents;
    setNewCardContents([...prev]);
  }

  const validation = (name, value) => {
    const maxLength = 5;
    const deckNameMinLength = 3;
    const exceedLengthDeckMessage = `Must be more than 3 characters and less than ${maxLength} charactors long!`;
    const exceedLengthMessage = `Must be ${maxLength} charactors long!`;

    let error = {
      key: name,
      message: ''
    }
    
    switch (name) {
      case 'deckName':
        error.message = value.trim().length < deckNameMinLength || value.trim().length > maxLength ? exceedLengthDeckMessage : '';
  
      break;

      case 'description':
        if (value.length > maxLength) {
          error.message = exceedLengthMessage;
        }
        
      break;

      case 'term':
        if (value.length === 0) {
          error.message = 'Required';
        }

        if (value.length > maxLength) {
          error.message = exceedLengthMessage;
        }
        
      break;

      case 'definition':
        if (value.length === 0) {
          error.message = 'Required';
        }
        
        if (value.length > maxLength) {
          error.message = exceedLengthMessage;
        }

      break;
      
      default:
      break;
    }
    return error;
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();

    const endpoints = {
      "NEWDECK": "api/deck/create"
    }

    axios.post(endpoints.NEWDECK, {newDeckContents, newCardContents})
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        const error = err.response.data.error;
        console.log(error);
      });
  }

  const cardFormItems = newCardContents.map((card, index) =>
    <CardForm
      key={index}
      editCardContents={editCardContents}
      card={card}
      index={index}
      validation={validation}
    />
  )

  return (
    <Wrapper>
      <form onSubmit={handleSubmitClick}>
        <DeckDetailsForm
          newDeckContents={newDeckContents}
          setNewDeckContents={setNewDeckContents}
          validation={validation}
        />
        <CreateCardHeader />
        {newCardContents &&cardFormItems}
        <div className='addButton'>
          <button onClick={createNewCard}>
            <GrAddCircle />
          </button>
        </div>
        <div className="saveButton">
          <button>Save</button>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`

.addButton {
  text-align: right;
  button {
    margin: 0 1rem;
  }
}

  button {
    svg {
      font-size: 3rem;
      text-align: left;
    }
  }

`

export default Create