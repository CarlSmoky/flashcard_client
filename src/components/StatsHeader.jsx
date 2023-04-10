import React from 'react'
import styled from 'styled-components'

const StatsHeader = () => {

  return (
    <Wrapper>
      <div className='term'>
        <p>Term</p></div>
      <div className='verticalLine'></div>
      <div className='definition'>
        <p>Definition</p></div>
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
    width: 33%;
    text-align: left;

    p {
      margin: 0 2.1rem;
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
    width: 50%;
    margin-left: 2rem;
    text-align: left;

    p {
      text-align: left;
      font-size: 1.5rem;
      font-family: var(--secondary-font);
      text-transform: uppercase;
    }
  }

  .isLearning {
    width:10%;
  }

  .star {
    width: 5%;
  }


`

export default StatsHeader