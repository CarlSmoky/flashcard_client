import React from 'react'
import styled from 'styled-components'

const CardDetailsHeader = () => {

  return (
    <Wrapper>
      <div className='term'>
        <span>Term</span>
      </div>
      <div className='verticalLine'></div>
      <div className='definition'>
        <span>Definition</span>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  /* margin: 1rem auto 0; */

  .term, .definition {
    width: 56%;
    text-align: left;
    margin: 0 2rem;

    span {
      text-align: left;
      font-family: var(--primary-font);
      font-size: 1.5rem;
      font-weight: 200;
      text-transform: uppercase;
      border-bottom: 1px solid var(--black-primary);
    }
  }

  .verticalLine {
    border-right: 2px solid transparent;
    margin: 1rem 0;
  }
`

export default CardDetailsHeader