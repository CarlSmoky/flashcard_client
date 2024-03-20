import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { AiTwotoneStar, AiOutlineStar } from 'react-icons/ai';

const Wrapper = styled.div`
  display: flex;
  justify-items: center;
  cursor: pointer;

  svg {
    font-size: 2rem;
    padding: .5rem;

    &.filledStar {
    color: gold;
    }
  }
`

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

export default Star