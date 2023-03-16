import React from 'react'
import styled from 'styled-components'
import Star from './Star'

const CardHeader = ({
  title,
  fillStar,
  setCardProperty,
  cardId,
}) => {

  return (
    <Wrapper>
      <CardSideTitle>{title}</CardSideTitle>
      <Star
        fillStar={fillStar}
        setCardProperty={setCardProperty}
        cardId={cardId}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardSideTitle = styled.h3`
  font-size: 1.5rem;
  font-family: var(--tertiary-font);
  text-align: left;
  margin: auto 2rem;
  user-select: none;
`;


export default CardHeader