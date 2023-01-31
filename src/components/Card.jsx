import React, { useState } from 'react'
import styled from 'styled-components'
import DeckSettings from './DeckSettings';
import { useParams } from 'react-router-dom'

const Card = () => {
  const { id } = useParams();
  const [numCard, setNumCard] = useState(0);

  return (
    <>
    {numCard === 0 && <DeckSettings setNumCard={setNumCard} id={id}/>}
    <StyledCard>
      Card
    </StyledCard>
    </>
  )
}

const StyledCard = styled.div`
  width: 100%;
  height: 40rem;
  background: var(--quaternary-color);
  z-index: -1;
`

export default Card