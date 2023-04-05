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

  console.log(definitionError);

  const [state, setState] = useState(card);

  const onChangeCard = (e) => {
    const newState = { ...state, [e.target.name]: e.target.value }
    // setState(prev => ({...prev, [e.target.name]: e.target.value}));
    setState(newState);
    editCardContents(index, newState);
    validation(e.target.name, e.target.value, index);
  };

  /*
  TODO: 
  • onChangeCard calls editCardContents with its own index and cardContents

  • maybe we need to update state here a useEffect ???
  */

  return (
    <Wrapper>
      <div className='term'>
        <textarea
          onChange={onChangeCard}
          type="text"
          name="term"
          id="term"
          value={state.term}
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
          value={state.definition}
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
      margin-left: 1rem;
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