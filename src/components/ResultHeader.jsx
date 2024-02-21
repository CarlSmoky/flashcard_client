import React from 'react'
import styled from 'styled-components'

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

  @media (max-width: 768px) {
    margin: 2rem auto 0;

    h2 {
    font-size: 1.4rem;
    }

    p {
      font-size: 1rem;
    }
  }
`

export default ResultHeader