import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { RxCross2 } from 'react-icons/rx'
import Button from './Button';

const DeckSettings = ({ setNumCard, deckName, setStart, totalCards}) => {

  const [numCards, setNumCards] = useState(0);

  useEffect(() => {
    setNumCards(totalCards);
  }, [totalCards]);

  const onChange = (e) => {
    setNumCards(e.target.value)
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    setNumCard(numCards);
    setStart(true);
  }

  // When cancel button clicked, back to /decklist
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/decklist`; 
    navigate(path);
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmitClick} type="post">
        <Header>
          <Heading>You Select...</Heading>
          <RxCross2 onClick={routeChange}/>
        </Header>
        {deckName && <Title>{deckName}</Title>}
        <Label htmlFor="numCards">Cards: </Label>
        <input
          onChange={onChange}
          id="numCards"
          type="number"
          name="numCards"
          min="1"
          max={totalCards}
          value={numCards}
        />
        <ButtonWrapper>
          <Button text="Start" />
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
  margin: 1rem;
  
  svg {
    font-size: 2rem;
  }
`
const Heading = styled.span`
  font-size: 1.5rem;
`
const Title = styled.h2`
  font-size: 2rem;
  height: 25%;
`

const Label = styled.label`
  font-size: 2rem;
`


const ButtonWrapper = styled.div`
  height: 3rem;
  margin: 4rem 0;
`

export default DeckSettings