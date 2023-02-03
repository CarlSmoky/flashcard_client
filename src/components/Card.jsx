import React, { useState } from "react"
import styled, { css } from "styled-components"

export default function Card({ card }) {
  const [side, setSide] = useState();

  function handleClick() {
    console.log("clicked!");
    setSide(!side);
    console.log(side);
  }

  return (

    <StyledCard>
      <CardInner className={`card ${side ? "side" : ""}`} onClick={handleClick}>
        <CardFront>
          <h4>Term</h4>
          <p>{card.term}</p>
        </CardFront>
        <CardBack>
        <h4>Definition</h4>
          <p>{card.definition}</p>
        </CardBack>
      </CardInner>
    </StyledCard>
  );
}

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.4s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const StyledCard = styled.div`
  background-color: transparent;
  width: 80%;
  height: 60%;
  perspective: 1000px;
  margin: 2rem auto;

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
`;

const cardSideTitleStyle = css`
  font-size: 1.5rem;
  text-align: left;
  margin: 1rem 0 0 2rem;
`

const cardSideContentStyle = css`
  font-size: 2rem;
  text-align: left;
  margin: 2rem;
  height: 80%;
`

const CardFront = styled.div`
  background-color: var(--quaternary-color);
  height: 100%;
  width: 100%;
  ${absoluteStyle}

  h4 {
    ${cardSideTitleStyle}
  }
  p {
    ${cardSideContentStyle}
  }
  
`;

const CardBack = styled.div`
  background-color: var(--tertiary-color);
  color: white;
  transform: rotateY(180deg);
  ${absoluteStyle}

  h4 {
    ${cardSideTitleStyle}
  }
  p {
    ${cardSideContentStyle}
  }
`;