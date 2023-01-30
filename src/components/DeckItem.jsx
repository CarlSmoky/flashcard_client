import React from 'react'
import styled from 'styled-components'


const DeckItem = ({id, deckName, user_id}) => {
  return (
    <Card>
      <h1>{deckName}</h1>
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
  
  transition: all 0.5s ease-in-out;
  
  &:hover {
    box-shadow: 0 3px 3px var(--black-secondary);
    cursor: pointer;
  }
`

export default DeckItem