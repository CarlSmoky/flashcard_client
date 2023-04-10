import React, { useState } from "react"
import styled, { css } from "styled-components"
import CardWrapper from './CardWrapper'
import { modes } from '../helpers/modes'

const Card = ({
  card,
  showingModal,
  nextCard,
  isEndCard,
  setCardProperty,
  setMode,
  addLoadedCards,
  current
}) => {
  
  const [side, setSide] = useState();

  const handleClick = e => {
    if (showingModal) { return; }
    setSide(!side);
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

  return (

    <StyledCard >
      <CardInner className={`card ${side ? "side" : ""}`} onClick={handleClick}>
        <CardFront disabled={showingModal}>
          <CardWrapper
            title="Term"
            card={card}
            showingModal={showingModal}
            setLearningStatus={setLearningStatus}
            setCardProperty={setCardProperty}
          />
        </CardFront>

        <CardBack>
          <CardWrapper
            title="Definition"
            card={card}
            showingModal={showingModal}
            setLearningStatus={setLearningStatus}
            setCardProperty={setCardProperty}
          />
        </CardBack>
      </CardInner>
    </StyledCard>
  );
}

export default Card

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.4s;
  transform-style: preserve-3d;
`;

const StyledCard = styled.div`
  background-color: transparent;
  width: 80%;
  max-width: 70rem;
  perspective: 1000px;
  margin: 3rem 0 5rem;

  ${CardInner}.side {
    transform: rotateY(-180deg);
  }
`;

const absoluteStyle = css`
  position: absolute;
  width: calc(100% - 0.4rem - 0.4rem);
  height: 100%;
  border: var(--side-column-border) solid var(--black-primary);  
  border-radius: .8rem;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  color: var(--black-secondary);
`

const CardFront = styled.div`
  background-color: var(--quaternary-color);
  height: 100%;
  width: 100%;
  ${absoluteStyle}

  ${({ disabled }) => {
    return disabled
      ? css`
      
    `
      : css`
      &:hover {
        cursor: pointer;
      }
    `
  }}
`;

const CardBack = styled.div`
  background-color: var(--tertiary-color);
  color: white;
  transform: rotateY(180deg);
  ${absoluteStyle}

  &:hover {
    cursor: pointer;
  }
`;

