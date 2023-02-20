import React from 'react'
import styled from "styled-components"
import CardHeader from './CardHeader'
import Button from "./Button";

const CardWrapper = ({
  title,
  card,
  showingModal,
  nextCard,
  isEndCard,
  setCardProperty
}) => {
  
  return (
    <>
      <CardHeader
        title={title}
        setCardProperty={setCardProperty}
        fillStar={card.fillStar}
        cardId={card.id}
      />
      <Content
        className={!showingModal ? "textSelectEnable" : ""}>{card.term}
      </Content>
      <ButtonWrapper>
        <Button
          text="Learning"
          disabled={showingModal}
          nextCard={nextCard}
          isEndCard={isEndCard}
          setCardProperty={setCardProperty}
          cardId={card.id}
        />
        <Button
          text="Know"
          disabled={showingModal}
          nextCard={nextCard}
          isEndCard={isEndCard}
          setCardProperty={setCardProperty}
          cardId={card.id}
        />
      </ButtonWrapper>
    </>
  )
}

const Content = styled.p`
  font-size: 2rem;
  text-align: left;
  margin: 2rem;
  height: 60%;
  font-family: var(--secondary-font);

  &.textSelectEnable {
  user-select: text;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export default CardWrapper