import React, { useState } from "react"
import styled from "styled-components"

export default function Card({ card }) {
  const [side, setSide] = useState();

  function handleClick() {
    console.log("clicked!");
    setSide(!side);
    console.log(side);
  }

  return (

    <StyledCard className={`card ${side ? "side" : ""}`} onClick={handleClick}>
      <small>
        <span>Card ID</span>
        {card.id}
      </small>
      {/* {side ? card.fields.side1 : card.fields.side2} */}
      <div className="front">{card.term}</div>
      <div className="back">{card.definition}</div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  width: 100%;
  height: 20rem;
  border: var(--side-column-border) solid var(--black-primary);

  
`