import React from 'react'
import styled from 'styled-components'

const DeckDetailsForm = ({
  newDeckContents,
  setNewDeckContents,
  validation
}) => {

  const onChangeDeck = (e) => {
    const returnedError = validation(e.target.name, e.target.value);
    console.log("onChangeCard", returnedError)
    const updatedDeck = {...newDeckContents,
      [e.target.name]: e.target.value,  
      errors: 
        {
          ...newDeckContents.errors,
          [returnedError.key] : returnedError.message
        }}
    
        setNewDeckContents(updatedDeck);
  };

  return (
    <Wrapper>
      <div>
        <label htmlFor="title">Title</label>
        <input
          onChange={onChangeDeck}
          type="text"
          name="deckName"
          id="deckName"
          value={newDeckContents.deckName}
          required
        />
      <p>{newDeckContents.errors.deckName}</p>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          onChange={onChangeDeck}
          type="text"
          name="description"
          id="description"
          value={newDeckContents.deckDescription}
        />
        <p>{newDeckContents.errors.description}</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 98%;
  margin: 1rem auto 1rem;
  border-radius: .5rem;
  border: 2px solid var(--black-primary);
  background: var(--tertiary-color);
  text-align: left;


  div {
    background: var(--quaternary-color);

    label {
      display: block;
      padding: 1rem;
    }
    
    textarea, input {
      width: 98%;
      margin-left: 1rem;
      border-top-style: hidden;
      border-right-style: hidden;
      border-left-style: hidden;
      border-bottom-style: groove;
      background-color: var(--quaternary-color);
      resize: none;
    }

    textarea:focus, input:focus{
    outline: none;
    }

    p {
      margin-left: 1rem;
      font-size: 1rem;
      color: red;
      height: 1.5rem;
    }


  }


`

export default DeckDetailsForm