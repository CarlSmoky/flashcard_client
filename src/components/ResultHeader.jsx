import React from 'react'
import styled from 'styled-components'
import StatsHeader from './StatsHeader'

const ResultHeader = ({
  deckName,
  numCards,
  numLearning
}) => {
  return (
    <Wrapper>
      <div className="row">
        <h2>{deckName}</h2>
      <div>
        <p>Learning: <span>{numLearning}</span></p>
        <p>Know: <span>{numCards - numLearning}</span></p>
        <p>Total cards: <span>{numCards}</span></p>
      </div>
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

  h2 {
    font-size: 1.7rem;
    text-transform: uppercase;
  }

  p {
    font-size: 1.3rem;
    font-family: var(--primary-font);
    text-align: right;
    text-transform: uppercase;

    span {
      display: inline-block;
      width: 3rem;
      text-align: center;
    }
    
  }
`

export default ResultHeader