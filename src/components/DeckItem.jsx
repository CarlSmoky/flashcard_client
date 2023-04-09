import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';



const DeckItem = ({ id, deckName }) => {

  return (
    <Card >
      <Link to={`/deck/${id}`}>
        <ClickArea>
          <h1>{deckName}</h1>
        </ClickArea>
      </Link>
    </Card>
  )
}

const Card = styled.div`
  width: 30%;
  height: 20rem;
  margin: 1rem 1rem 1rem 0;
  border: .3rem solid var(--black-primary);
  background: var(--tertiary-color);
  border-radius: 5px;
  
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
  width: 30%;
  height: 20rem;
  margin: 0;

  h1 {
    font-family: var(--primary-font);
    font-weight: 200;
    text-transform: uppercase;
    margin: 1.5rem;
  }
`

export default DeckItem