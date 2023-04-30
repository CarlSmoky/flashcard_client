import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { RxCross2 } from 'react-icons/rx'
import Button from './Button'
import { modes } from '../helpers/modes'
import { truncate } from '../helpers/utilities';

const DeckSettings = ({
  setNumCards,
  deckName,
  setMode,
  totalCards
}) => {

  const [settingNumCards, setsettingNumCards] = useState(0);

  useEffect(() => {
    setsettingNumCards(totalCards);
  }, [totalCards]);

  const onChange = (e) => {
    setsettingNumCards(e.target.value)
  };

  const handleStart = () => {
    setNumCards(settingNumCards);
    setMode(modes.answering);
  }

  // When cancel button clicked, back to /decklist
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/decklist`;
    navigate(path);
  }

  return (
    <Wrapper>
      <form>
        <Header>
          <button >
            <RxCross2 onClick={routeChange} />
            <span className="visually-hidden">Cancel Button</span>
          </button>
        </Header>
        {deckName && <Title>{truncate(deckName, 18)}</Title>}
        <Label htmlFor="numCards">Cards: </Label>
        <input
          onChange={onChange}
          id="numCards"
          type="number"
          name="numCards"
          min="1"
          max={totalCards}
          value={settingNumCards}
        />
        <ButtonWrapper>
          <Button
            text="Start"
            buttonType='button'
            onButtonClick={handleStart}
          />
        </ButtonWrapper>
      </form>
    </Wrapper>
  )
}

// Mixin
const holizontal = () => {
  return `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  list-style: none;
  text-align: center;
  `
}

const Wrapper = styled.div`
  ${holizontal};
  display: flex;
  flex-direction: row;
  width: 40rem;
  height: 30rem;
  background: var(--primary-color);
  border: var(--side-column-border) solid var(--black-primary);
  border-radius: 1rem;
  z-index: 100;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 38rem;
  height: 15%;

  button {
    padding: 1rem;
    cursor: pointer;
  }

  svg {
    font-size: 2rem;
  }

`

const Title = styled.h2`
  font-size: 2rem;
  height: 25%;
  font-weight: 600;
  text-transform: uppercase;
`

const Label = styled.label`
  font-size: 1.5rem;
  text-transform: uppercase;
`


const ButtonWrapper = styled.div`
  height: 3rem;
  margin: 4rem 0;
`

export default DeckSettings