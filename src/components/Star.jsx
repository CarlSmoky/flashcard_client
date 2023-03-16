import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai'

const Star = ({
  fillStar,
  setCardProperty,
  cardId
}) => {

  const [displayFilledStar, setDisplayFilledStar] = useState(fillStar);

  useEffect(() => {
    setDisplayFilledStar(fillStar)
  }, [fillStar])

  const clickStar = e => {
    e.stopPropagation();
    setCardProperty(cardId, 'fillStar',!fillStar)
  }
  
  return (
    <Wrapper onClick={clickStar}>       {displayFilledStar ? <AiTwotoneStar className="filledStar" /> : <AiOutlineStar />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  
  cursor: pointer;
  height: 3rem;
  text-align: right;

  svg {
    font-size: 2rem;
    padding: .5rem;
    margin: .4rem .4rem 0 .4rem;

    &.filledStar {
    color: gold;
    }
  }
`;

export default Star