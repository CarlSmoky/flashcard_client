import React, { useState } from "react"
import styled, { css } from "styled-components"
import CardWrapper from './CardWrapper'

const Card = ({
  card,
  showingModal,
  nextCard,
  isEndCard,
  setCardProperty,
  setMode
}) => {
  
  const [side, setSide] = useState();

  const handleClick = e => {
    if (showingModal) { return; }
    setSide(!side);
  }

  return (

    <StyledCard >
      <CardInner className={`card ${side ? "side" : ""}`} onClick={handleClick}>
        <CardFront disabled={showingModal}>
          <CardWrapper
            title="Term"
            card={card}
            showingModal={showingModal}
            nextCard={nextCard}
            isEndCard={isEndCard}
            setCardProperty={setCardProperty}
            setMode={setMode}
          />
        </CardFront>

        <CardBack>
          <CardWrapper
            title="Definition"
            card={card}
            showingModal={showingModal}
            nextCard={nextCard}
            isEndCard={isEndCard}
            setCardProperty={setCardProperty}
            setMode={setMode}
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
  border-radius: 1rem;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  color: var(--black-secondary);
  box-shadow: .5rem .5rem;
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

