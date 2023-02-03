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
          <small>
            <span>Card ID</span>
            {card.id}
          </small>
          {/* {side ? card.fields.side1 : card.fields.side2} */}
          <div className="front">{card.term}</div>
        </CardFront>
        <CardBack>
          <div className="back">{card.definition}</div>
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
  width: 100%;
  height: 100%;
  perspective: 1000px;

  ${CardInner}.side {
    transform: rotateY(-180deg);
  }
`;

const absoluteStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

const CardFront = styled.div`
  height: 100%;
  width: 100%;
  ${absoluteStyle}
`;

const CardBack = styled.div`
  background-color: #2980b9;
  color: white;
  transform: rotateY(180deg);
  ${absoluteStyle}
`;