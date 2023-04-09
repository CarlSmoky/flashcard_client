import React from 'react'
import styled, { css } from 'styled-components'
import { validation } from '../helpers/utilities';

const DeckDetailsForm = ({
  newDeckContents,
  setNewDeckContents
}) => {

  const onChangeDeck = (e) => {
    const returnedError = validation(e.target.name, e.target.value);
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
        <label htmlFor="deckName">Title</label>
        <input
          onChange={onChangeDeck}
          type="text"
          name="deckName"
          id="deckName"
          value={newDeckContents.deckName}
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

const absoluteStyle = css`
  width: 98%;
  margin-left: 1rem;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  background-color: var(--quaternary-color);
  resize: none;
  font-size: 1.7rem;
  font-family: var(--tertiary-font);
`

const Wrapper = styled.div`
  width: 98%;
  margin: 1rem auto 1rem;
  border-radius: .3rem;
  border: 2px solid var(--black-primary);
  background: var(--tertiary-color);
  text-align: left;

  div {
    background: var(--quaternary-color);

    label {
      display: block;
      padding: 1rem;
      font-family: var(--primary-font);
      font-size: 1.5rem;
      font-weight: 200;
      text-transform: uppercase;
    }

    input {
      border-bottom-style: groove;
      ${absoluteStyle}
    }

    textarea {
      border-bottom-style: hidden;
      ${absoluteStyle}
    }

    textarea:focus, input:focus{
    outline: none;
    }

    p {
      margin-left: 1rem;
      font-size: 1.4rem;
      color: red;
      font-family: var(--tertiary-font);
    }
  }


`

export default DeckDetailsForm