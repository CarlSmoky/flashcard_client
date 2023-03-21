import React, { useState } from 'react'
import styled from 'styled-components'
import DeckDetailsForm from '../components/DeckDetailsForm'
import CreateCardHeader from '../components/CardDetailsHeader' 
import CardForm from '../components/CardForm'

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
    setNewCardContents(prev => ([ ...prev, {...defaultCard} ]));
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

  return (
    <Wrapper>
      <form onSubmit={handleSubmitClick}>
      <DeckDetailsForm
        newDeckContents={newDeckContents}
        setNewDeckContents={setNewDeckContents}
      />
      <CreateCardHeader/>
      {cardFormItems}
      <button onClick={createNewCard}>Add</button>
      <button>Save</button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`

`

export default Create