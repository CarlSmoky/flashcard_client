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
        />
        <CreateCardHeader />
        {newCardContents && cardFormItems}
        <div className='addButton'>
          <button onClick={createNewCard} type='button'>
            <GrAddCircle />
            <span className="visually-hidden">Add Button</span>
          </button>
        </div>
        <div className="saveButton">
          <button type='submit'>Save</button>
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