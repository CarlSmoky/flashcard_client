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
      <div>
        <Star
          fillStar={fillStar}
          setCardProperty={setCardProperty}
          cardId={cardId}
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;

  div {
    margin-right: .4rem;
  }
`;

const CardSideTitle = styled.h3`
  font-size: 1.8rem;
  font-family: var(--secondary-font);
  font-weight: 600;
  text-transform: uppercase;
  text-align: left;
  margin: auto 2rem;
  user-select: none;
  
`;


export default CardHeader