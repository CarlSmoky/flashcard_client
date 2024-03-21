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

  return (
    <Wrapper>
      <Form>
        <Header>
          <button onClick={() => navigate('/decklist')}>
            <RxCross2 />
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
      </Form>
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
  width: 35%;
  min-width: 40rem;
  height: 35%;
  min-height: 30rem;
  background: var(--primary-color);
  border: 2px solid var(--black-primary);
  z-index: 10;

  @media (max-width: 768px) {
    width: 50%;
    min-width: 30rem;
  }

  @media (max-width: 488px) {
    width: 75%;
    min-width: 20rem;
  }
`

const Form = styled.form`
  width: 100%;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 15%;

  button {
    padding: 1rem;
    cursor: pointer;
    color: #2E2E2E;
  }

  svg {
    font-size: 2rem;
  }
`

const Title = styled.h2`
  width: 100%;
  height: 25%;
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 488px) {
    font-size: 1.3rem;
  }
`

const Label = styled.label`
  font-size: 1.5rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 488px) {
    font-size: 1rem;
  }
`

const ButtonWrapper = styled.div`
  height: 3rem;
  margin: 4rem 0;
`

export default DeckSettings