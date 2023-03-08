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
  setCardProperty,
  setMode
}) => {
  
  const displaySide = (title) => {
    return title ==="Term" ? card.term : card.definition;
  }

  return (
    <>
      <CardHeader
        title={title}
        setCardProperty={setCardProperty}
        fillStar={card.fillStar}
        cardId={card.id}
      />
      <Content
        className={!showingModal ? "textSelectEnable" : ""}>
        {displaySide(title)}
      </Content>
      <ButtonWrapper>
        <Button
          text="Learning"
          disabled={showingModal}
          nextCard={nextCard}
          isEndCard={isEndCard}
          setCardProperty={setCardProperty}
          cardId={card.id}
          isLearning={card.isLearning}
          setMode={setMode}
        />
        <Button
          text="Know"
          disabled={showingModal}
          nextCard={nextCard}
          isEndCard={isEndCard}
          setCardProperty={setCardProperty}
          cardId={card.id}
          isLearning={!card.isLearning}
          setMode={setMode}
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