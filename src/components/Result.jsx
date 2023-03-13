import React from 'react'
import styled from 'styled-components'
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'

const Result = ({term, definition, isLearning, fillStar}) => {

  return (
    <Wrapper>
      <div className='term'><p>{term}</p></div>
      <div className='definition'><p>{definition}</p></div>
      <div className='isLearning'><p>{`${isLearning ? "Learning" : "Know"}`}</p></div>
      <div className='star'>{fillStar ? <AiTwotoneStar className="filledStar" /> : <AiOutlineStar />}</div>
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
  background: var(--tertiary-color);

  div {
    margin: auto 0;
    padding: 2rem;

    p {
      text-align: left;
      font-size: 1.3rem;
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
    margin: auto 0;
  }

  svg {
    font-size: 2rem;
    padding: .5rem;
    margin: .4rem .4rem 0 .4rem;

    &.filledStar {
    color: gold;
    }
  }


`

export default Result