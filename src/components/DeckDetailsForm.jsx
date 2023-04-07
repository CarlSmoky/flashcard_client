import React from 'react'
import styled from 'styled-components'

const DeckDetailsForm = ({
  newDeckContents,
  setNewDeckContents,
  validation,
  deckNameError,
  descriptionError
}) => {

  const onChange = (e) => {
    setNewDeckContents({ ...newDeckContents, [e.target.name]: e.target.value });
    validation(e.target.name, e.target.value);
  };

  return (
    <Wrapper>
      <div>
        <label htmlFor="title">Title</label>
        <input
          onChange={onChange}
          type="text"
          name="deckName"
          id="deckName"
          value={newDeckContents.deckName}
          required
        />
      <p>{deckNameError}</p>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          onChange={onChange}
          type="text"
          name="description"
          id="description"
          value={newDeckContents.deckDescription}
        />
        <p>{descriptionError}</p>
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