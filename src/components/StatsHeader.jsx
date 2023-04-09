import React from 'react'
import styled from 'styled-components'

const StatsHeader = ({
  term, 
  definition, 
  isLearning, 
  fillStar
}) => {

  return (
    <Wrapper>
      <div className='term'><span>Term</span></div>
      <div className='verticalLine'></div>
      <div className='definition'><span>Definition</span></div>
      <div className='isLearning'></div>
      <div className='star'></div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 1rem auto 0;

  .term {
    width: 28.5%;
    margin-left: 2rem;
    text-align: left;

    span {
      text-align: left;
      font-size: 1.5rem;
      font-family: var(--secondary-font);
      text-transform: uppercase;
    }
  }

  .verticalLine {
    border-right: 2px solid transparent;
  }

  .definition {
    width: 45%;
    margin-left: 2rem;
    text-align: left;

    span {
      text-align: left;
      font-size: 1.5rem;
      font-family: var(--secondary-font);
      text-transform: uppercase;
    }
  }

  .isLearning {
    width:15%;
  }

  .star {
    width: 10%;
  }


`

export default StatsHeader