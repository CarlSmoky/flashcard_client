import React from 'react'
import styled from 'styled-components'
import StatsHeader from './StatsHeader'

const ResultHeader = ({
  deckName,
  numCards
}) => {
  console.log(numCards);
  return (
    <Wrapper>
      <div className="row">
        <h2>{deckName}</h2>
        <p>Total cards: {numCards}</p>
      </div>
      <StatsHeader/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 98%;
  margin: 3rem auto 0;

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  p {
    font-size: 1.5rem;
    font-family: var(--secondary-font);
  }


`

export default ResultHeader