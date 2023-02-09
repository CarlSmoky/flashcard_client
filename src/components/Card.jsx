import React, { useState } from "react"
import styled, { css } from "styled-components"
import CardHeader from './CardHeader'
import Button from "./Button";

export default function Card({ card, showingModal }) {
  const [side, setSide] = useState();
  const [fillStar, setFillStar] = useState(false);

  const handleClick = e => {
    if (showingModal) { return; }
    setSide(!side);
  }

  const clickStar = e => {
    e.stopPropagation();
    setFillStar(!fillStar);
  }

  return (

    <StyledCard>
      <CardInner className={`card ${side ? "side" : ""}`} onClick={handleClick}>
        <CardFront>
          <CardHeader
            title="Term"
            clickStar={clickStar}
            fillStar={fillStar}
          />
          <Content
            className={!showingModal ? "textSelectEnable" : ""}>{card.term}
          </Content>
          <ButtonWrapper>
          <Button text="Learning" />
          <Button text="Know" />
          </ButtonWrapper>
        </CardFront>

        <CardBack>
        <CardHeader
          title="Definition"
          clickStar={clickStar}
          fillStar={fillStar}
        />
          <Content
            className={!showingModal ? "textSelectEnable" : ""}>{card.definition}
          </Content>
          <ButtonWrapper>
          <Button text="Learning" />
          <Button text="Know" />
          </ButtonWrapper>
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
  
  &:hover {
    box-shadow: .5rem .5rem;
    cursor: pointer;
  }
`

const CardFront = styled.div`
  background-color: var(--quaternary-color);
  height: 100%;
  width: 100%;
  ${absoluteStyle}
`;

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

const CardBack = styled.div`
  background-color: var(--tertiary-color);
  color: white;
  transform: rotateY(180deg);
  ${absoluteStyle}
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`