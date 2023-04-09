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

  div {
    margin: auto 0;
    text-align: left;
    margin: 0 2rem;

    span {
      text-align: left;
      font-size: 1.5rem;
      font-family: var(--secondary-font);
      text-transform: uppercase;
    }
  }

  .term {
      width: 25%; 
      text-align: left;
  }

  .definition {
    width: 45%;
    padding-left: 1rem;
    
  }

  .star {
    width: 4rem;
  }


`

export default StatsHeader