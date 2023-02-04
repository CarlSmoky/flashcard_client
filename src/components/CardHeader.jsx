import React from 'react'
import styled from 'styled-components'
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'

const CardHeader = ({title, clickStar, fillStar}) => {
  return (
    <Wrapper>
      <h4>{title}</h4>
      <div onClick={clickStar}>
        {fillStar ? <AiTwotoneStar /> : <AiOutlineStar />}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div {
    cursor: pointer;
    height: 3rem;
    text-align: right;
  }

  svg {
    font-size: 2rem;
    margin: auto 0;
    line-height: 0;
    padding: .5rem;
    
  }
`



export default CardHeader