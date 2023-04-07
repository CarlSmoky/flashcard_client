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
    // setErrors((prev) => ({...prev, newCardContents: [...prev.newCardContents, 
    //   {
    //     term: '',
    //     definition: ''
    //   }
    // ]}));
  };

  const editCardContents = (index, cardContents) => {
    const prev = [...newCardContents];
    prev[index] = cardContents;
    setNewCardContents([...prev]);
  }

  const validation = (name, value) => {
    let error = {
      key: name,
      message: ''
    }
    /*

    • probably should make the deck validation work the same way as the card validation

    • currently the deck's description error isn't working (but need to redo deck validation anyway)

    */
    let message = '';
    switch (name) {
      case 'deckName':
        message = value.trim().length < 3 || value.trim().length > 255 ? 'Title must be more than 3 characters and less than 255 long!' : '';
  
        setNewDeckContents((prev) => ({...prev, errors : {...prev.errors, [name]: message}}));
      break;

      case 'description':

        if (value.length > 255) {
          error.message = 'Term must be less than 255 characters long!'
        }
        setNewDeckContents((prev) => ({...prev, errors : {...prev.errors, [name]: message}}));
      break;

      case 'term':
        if (value.length === 0) {
          error.message = 'Required';
        }

        if (value.length > 5) {
          error.message = 'Term must be less than 255 characters long!'
        }
        
      break;

      case 'definition':
        
        if (value.length === 0) {
          error.message = 'Required';
        }
        
        if (value.length > 5) {
          error.message = 'Term must be less than 255 characters long!'
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
      termError={newCardContents[index].errors.term}
      definitionError={newCardContents[index].errors.definition}
      
    />
  )

  return (
    <Wrapper>
      <form onSubmit={handleSubmitClick}>
        <DeckDetailsForm
          newDeckContents={newDeckContents}
          setNewDeckContents={setNewDeckContents}
          validation={validation}
          deckNameError={newDeckContents.errors.deckName}
          descriptionError={newDeckContents.errors.description}
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