import React, { useState } from 'react'
import styled from 'styled-components'
import { validation } from '../helpers/utilities'

const CardForm = ({
  editCardContents,
  card,
  index,
}) => {

  const onChangeCard = (e) => {
    const returnedError = validation(e.target.name, e.target.value);
    
    const updatedCard = {...card,
      [e.target.name]: e.target.value,  
      errors: 
        {
          ...card.errors,
          [returnedError.key] : returnedError.message
        }
    }
    
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
          aria-label="term"
        />
      <p>{card.errors.term}</p>
      </div>
      <div className='verticalLine'></div>
      <div className='definition'>
        <textarea
          onChange={onChangeCard}
          type="text"
          name="definition"
          id="definition"
          value={card.definition}
          aria-label="definition"
        />
      <p>{card.errors.definition}</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  height: 11rem;
  margin: 1rem auto 1rem;
  border-radius: .3rem;
  border: 2px solid var(--black-primary);
  background: var(--tertiary-color);

  .term, .definition {
    width: 56%;
    margin: 1rem;

    p {
      text-align: left;
      color: red;
      font-size: 1.4rem;
      color: red;
      font-family: var(--tertiary-font);
    }
  }

  .verticalLine {
    border-right: 2px solid var(--black-primary);
    margin: 1rem 0;
  }

  textarea {
    width: 100%;
    height: 70%;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
    background-color: var(--tertiary-color);
    resize: none;
    font-size: 1.7rem;
    font-weight: 100;
    font-family: var(--tertiary-font);
  }

  textarea:focus {
    outline: none;
  }
`

export default CardForm