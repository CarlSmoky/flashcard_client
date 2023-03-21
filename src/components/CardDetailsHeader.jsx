import React from 'react'
import styled from 'styled-components'

const CardDetailsHeader = () => {

  return (
    <Wrapper>
      <div className='term'>
        <span>Term</span>
      </div>
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

  div {
    width: 56%;
    text-align: left;
    margin: 0 2rem;

    span {
      text-align: left;
      font-size: 1.5rem;
      font-family: var(--secondary-font);
      border-bottom: 1px solid var(--black-primary);
    }
  }
`

export default CardDetailsHeader