import React from 'react'
import styled from 'styled-components'
import Star from './Star'


const Result = ({
  term,
  definition,
  isLearning,
  fillStar,
  setCardProperty,
  cardId
}) => {

  const clickLearning = e => {
    e.stopPropagation();
    setCardProperty(cardId, 'isLearning',
      !isLearning);
  }

  return (
    <Wrapper>
      <div className='term'>
        <p>
          {term}
        </p>
      </div>
      <div className='definition'>
        <p>{definition}</p>
      </div>
      <div className='isLearning'>
        <span onClick={clickLearning}>
          {`${isLearning ? "Learning" : "Know"}`}
        </span>
      </div>
      <Star
        fillStar={fillStar}
        setCardProperty={setCardProperty}
        cardId={cardId}
      />
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
  background: var(--quaternary-color);

  div {
    margin: auto 0;
    padding: 2rem;

    p {
      text-align: left;
      font-size: 1.5rem;
      font-family: var(--secondary-font);
    }
  }

  .term {
      width: 25%; 
    }

  .definition {
    width: 45%;
      
    p {
      padding-left: 2rem;
      border-left: .2rem solid var(--black-secondary);
    }
  }
  
  .isLearning {
    width: 6%;
    margin: auto 0;
    text-align: left;

    span {
      font-size: 1.5rem;
      font-family: var(--secondary-font);
      cursor: pointer;
      &:hover {
        border-bottom: 2px solid var(--black-secondary)
      }
    }
  }
`

export default Result