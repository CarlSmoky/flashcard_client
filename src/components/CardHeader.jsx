import React from 'react'
import styled from 'styled-components'
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'

const CardHeader = ({title, clickStar, fillStar}) => {
  return (
    <Wrapper>
      <CardSideTitle>{title}</CardSideTitle>
      <StarWrapper onClick={clickStar}>
        {fillStar ? <AiTwotoneStar className="filledStar" /> : <AiOutlineStar />}
      </StarWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StarWrapper = styled.div`
  div {
    cursor: pointer;
    height: 3rem;
    text-align: right;
  }

  svg {
    font-size: 2rem;
    padding: .5rem;
    margin: .4rem .4rem 0 .4rem;

    &.filledStar {
    color: gold;
    }
  }
`;

const CardSideTitle = styled.h3`
  font-size: 1.5rem;
  font-family: var(--tertiary-font);
  text-align: left;
  margin: auto 2rem;
  user-select: none;
`;


export default CardHeader