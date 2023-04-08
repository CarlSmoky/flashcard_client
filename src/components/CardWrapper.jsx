import React from 'react'
import styled from "styled-components"
import CardHeader from './CardHeader'
import Button from "./Button";
import { modes } from '../helpers/modes'

const CardWrapper = ({
  title,
  card,
  showingModal,
  nextCard,
  isEndCard,
  setCardProperty,
  setMode,
  addLoadedCards,
  current
}) => {
  
  const displaySide = (title) => {
    return title ==="Term" ? card.term : card.definition;
  }



  const setLearningStatus = (isLearning) => {
    if (!isEndCard) {
      nextCard();
    } else {
      setMode(modes.finishConfirmation);
      addLoadedCards(current)
    }
      
    setCardProperty(card.id, 'isLearning', isLearning);
  }

  const handleClickLearning = () => {
    setLearningStatus(true)
  }

  const handleClickKnow = () => {
    setLearningStatus(false)
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
          onButtonClick={handleClickLearning}
          disabled={showingModal}
          isSelected={card.isLearning}
        />
        <Button
          text="Know"
          onButtonClick={handleClickKnow}
          disabled={showingModal}
          isSelected={!card.isLearning}
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
  font-family: var(--tertiary-font);

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