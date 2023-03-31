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
    newDeckContent: {
      deckName: '',
      description: '',
    },
    newCardContent : [
      {
        term: '',
        definition: ''
      }
    ]
  })

  const validation = (name, value) => {
    let messge = '';
    switch (name) {
      case 'deckName':
        messge = value.trim().length < 3 ? 'Title must be more than 3 characters long!' : '';
        setErrors((prev) => ({...prev,newDeckContent: {[name]: messge}}));
      break;

      case 'description':
        messge = value.length > 255 ? 'Description must be less than 255 characters long!' : '';
        setErrors((prev) => ({...prev,newDeckContent: {[name]: messge}}));
      break;
      
      default:
      break;
    }
  }

  console.log(errors);

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