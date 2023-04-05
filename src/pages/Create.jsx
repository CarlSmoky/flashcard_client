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
    description: ''
  });

  //Card
  const defaultCard = {
    term: '',
    definition: ''
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

  //Validation

  const [errors, setErrors] = useState({
    newDeckContents: {
      deckName: '',
      description: '',
    },
    newCardContents : {
      0 : {
        term: '',
        definition: ''
      }
    }
  })

  const validation = (name, value, index) => {
    
    let messge = '';
    switch (name) {
      case 'deckName':
        messge = value.trim().length < 3 || value.trim().length > 255 ? 'Title must be more than 3 characters and less than 255 long!' : '';
        setErrors((prev) => ({...prev,newDeckContents: {[name]: messge}}));
      break;

      case 'description':

        if (value.length > 255) {
          messge = 'Term must be less than 255 characters long!'
        }

        setErrors((prev) => ({...prev, newDeckContents: {[name]: messge}}));
      break;

      case 'term':
        if (value.length === 0) {
          messge = 'Required';
        }

        if (value.length > 255) {
          messge = 'Term must be less than 255 characters long!'
        }

        setErrors((prev) => ({...prev, newCardContents: {...prev.newCardContents, 
          [index]: {...prev.newCardContents[index], [name]: messge}
        }}));
      break;

      case 'definition':
        
        if (value.length === 0) {
          messge = 'Required';
        }
        
        if (value.length > 255) {
          messge = 'Term must be less than 255 characters long!'
        }

        setErrors((prev) => ({...prev, newCardContents: {...prev.newCardContents, 
          [index]: {...prev.newCardContents[index], [name]: messge}
        }}));
      break;
      
      default:
      break;
    }
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
      termError={errors.newCardContents[index].term}
      definitionError={errors.newCardContents[index].definition}
      
    />
  )

  console.log(errors);

  return (
    <Wrapper>
      <form onSubmit={handleSubmitClick}>
        <DeckDetailsForm
          newDeckContents={newDeckContents}
          setNewDeckContents={setNewDeckContents}
          validation={validation}
          deckNameError={errors.newDeckContents.deckName}
          descriptionError={errors.newDeckContents.description}
        />
        <CreateCardHeader />
        {cardFormItems}
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