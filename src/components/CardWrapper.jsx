import React from 'react'
import styled from "styled-components"
import CardHeader from './CardHeader'
import Button from "./Button";

const CardWrapper = ({
  title,
  card,
  showingModal,
  setLearningStatus,
  setCardProperty
}) => {
  
  const displaySide = (title) => {
    return title ==="Term" ? card.term : card.definition;
  }

  return (
    <Wrapper>
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
          onButtonClick={() => {setLearningStatus(true)}}
          disabled={showingModal}
          isSelected={card.isLearning}
        />
        <Button
          text="Know"
          onButtonClick={() => {setLearningStatus(false)}}
          disabled={showingModal}
          isSelected={!card.isLearning}
        />
      </ButtonWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Content = styled.p`
  font-size: 2rem;
  text-align: left;
  margin: 2rem;
  height: 60%;
  font-family: var(--tertiary-font);

  &.textSelectEnable {
  user-select: text;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export default CardWrapper