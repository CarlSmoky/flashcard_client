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
    title: '',
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


  const handleSubmitClick = (e) => {
    e.preventDefault();
  }

  const cardFormItems = newCardContents.map((card, index) =>
    <CardForm
      key={index}
      editCardContents={editCardContents}
      card={card}
      index={index}
    />
  )

  const newDeckData = {
    deckName: 'test10',
    description: '',
    userId: 1,
  }

  const createDeck = () => {

    const endpoints = {
      "NEWDECK": "api/deck/create"
    }

    axios.post(endpoints.NEWDECK, newDeckData)
      .then(response => {
        // console.log(response);
        // const { id, deckName } = response.data;
        // console.log(id, deckName);
      })
      .catch(err => {
        const error = err.response.data.error;
        console.log(error);
      });
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmitClick}>
        <DeckDetailsForm
          newDeckContents={newDeckContents}
          setNewDeckContents={setNewDeckContents}
        />
        <CreateCardHeader />
        {cardFormItems}
        <div className='addButton'>
          <button onClick={createNewCard}>
            <GrAddCircle />
          </button>
        </div>
        <div className="saveButton">
          <button onClick={createDeck}>Save</button>
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