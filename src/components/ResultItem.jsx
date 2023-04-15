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
        <p>{term}</p>
      </div>
      <div className='verticalLine'></div>
      <div className='definition'>
        <p>{definition}</p>
      </div>
      <div className='isLearning'>
        <p onClick={clickLearning}>
          {`${isLearning ? "Learning" : "Know"}`}
        </p>
      </div>
      <div className="star">
        <Star
          fillStar={fillStar}
          setCardProperty={setCardProperty}
          cardId={cardId}
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  min-height: 5rem;
  margin: 1rem auto 1rem;
  border-radius: .5rem;
  border: 2px solid var(--black-primary);
  background: var(--quaternary-color);

  .term {
    width: 33%;
    text-align: left;

    p {
      margin: 1rem 2rem;
      font-size: 1.5rem;
      font-family: var(--tertiary-font);
    }
  }

  .verticalLine {
    border-right: 2px solid var(--black-primary);
    margin: 1rem 0;
  }

  .definition {
    width: 50%;
      
    p {
      margin: 1rem 2rem;
      text-align: left;
      font-size: 1.5rem;
      font-family: var(--tertiary-font);
    }
  }

  
  .isLearning {
    width: 10%;
    margin: auto 0;
    text-align: left;

    p {
      font-size: 1.3rem;
      font-family: var(--primary-font);
      font-weight: 400;
      text-transform: uppercase;
      text-align: center;
      cursor: pointer;
      transition: transform .1s ease-out;
      
      :hover {
        transform: scaleX(1.1) scaleY(1.1);
      }

      :active {
        text-decoration-line: underline;
      }
    }
  }

  .star {
    width: 5%;
    margin: auto;
    padding-right: 2rem; 
  }
`

export default Result