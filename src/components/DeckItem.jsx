import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';



const DeckItem = ({ id, deckName, user_id }) => {

  return (
    <Card >
      <Link to={`/deck/${deckName}`}>
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
  border: var(--side-column-border) solid var(--black-primary);
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
`

export default DeckItem