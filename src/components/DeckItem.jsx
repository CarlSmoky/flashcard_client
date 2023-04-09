import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { truncate } from '../helpers/utilities';

const DeckItem = ({ id, deckName, description }) => {
 
  return (
    <Wrapper >
      <Link to={`/deck/${id}`}>
        <ClickArea>
          <h1>{truncate(deckName, 35)}</h1>
          <p>{truncate(description, 65)}</p>
        </ClickArea>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 31%;
  min-width: 25rem;
  height: 20rem;
  margin: 1rem;
  border: .3rem solid var(--black-primary);
  background: var(--tertiary-color);
  border-radius: .3rem;
  
  transition: all 0.3s ease-in-out;
  
  &:hover {
    box-shadow: 0 3px 3px var(--black-secondary);
    cursor: pointer;
  }

  &:active {
  transform: translateY(4px);
}
`

const ClickArea =  styled.div`
  width: 100%;
  height: 100%;
  
  h1 {
    width: 90%;
    height: 6rem;
    margin: 1.5rem;
    font-family: var(--secondary-font);
    font-weight: 200;
    text-transform: uppercase;
    text-align: left;
    overflow-wrap: break-word;
  }

  p {
    width: 90%;
    margin: 0 1.5rem;
    text-align: left;
    font-size: 1.3rem;
    font-family: var(--tertiary-font);
    overflow-wrap: break-word;

  }
`

export default DeckItem