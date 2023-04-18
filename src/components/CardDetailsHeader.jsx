import React from 'react'
import styled from 'styled-components'

const CardDetailsHeader = () => {

  return (
    <Wrapper>
      <div className='term'>
        <p>Term <span>*</span></p>
      </div>
      <div className='verticalLine'></div>
      <div className='definition'>
        <p>Definition <span>*</span></p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  margin: 1rem auto 0;

  .term, .definition {
    width: 56%;
    text-align: left;
    margin-left: 1rem;

    p {
      text-align: left;
      font-family: var(--secondary-font);
      font-size: 1.5rem;
      font-weight: 200;
      text-transform: uppercase;

      span {
        color: red;
      }
    }
  }

  .verticalLine {
    border-right: 2px solid transparent;
    /* margin: 1rem 0; */
  }
`

export default CardDetailsHeader