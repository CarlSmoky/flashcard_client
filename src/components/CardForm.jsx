import React, { useState } from 'react'
import styled from 'styled-components'

const CardForm = ({
  editCardContents,
  card,
  index,
  validation,
  termError,
  definitionError
}) => {

  const onChangeCard = (e) => {
    const returnedError = validation(e.target.name, e.target.value);
    console.log("onChangeCard", returnedError)
    const updatedCard = {...card,
      [e.target.name]: e.target.value,  
      errors: 
        {
          ...card.errors,
          [returnedError.key] : returnedError.message
        }}
    
    editCardContents(index, updatedCard);
  };

  return (
    <Wrapper>
      <div className='term'>
        <textarea
          onChange={onChangeCard}
          type="text"
          name="term"
          id="term"
          value={card.term}
          required
        />
      <p>{termError}</p>
      </div>
      <div className='definition'>
        <textarea
          onChange={onChangeCard}
          type="text"
          name="definition"
          id="definition"
          value={card.definition}
          required
        />
      <p>{definitionError}</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  margin: 1rem auto 1rem;
  border-radius: .5rem;
  border: 2px solid var(--black-primary);
  background: var(--tertiary-color);

  div {
    width: 56%;
    height: 5rem;
    margin: 1rem;

    p {
      text-align: left;
      font-size: 1rem;
      color: red;
      height: 1.5rem;
    }
  }

  textarea {
      width: 100%;
      border-top-style: hidden;
      border-right-style: hidden;
      border-left-style: hidden;
      border-bottom-style: groove;
      background-color: var(--tertiary-color);
      resize: none;
    }

    textarea:focus {
    outline: none;
    }
`

export default CardForm