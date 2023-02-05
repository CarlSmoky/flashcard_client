import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { RxCross2 } from 'react-icons/rx'

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
          <h3>You Select...</h3>
          <RxCross2 onClick={routeChange}/>
        </Header>
        {deckName && <Title>{deckName}</Title>}
        <label>Cards: </label>
        <input
          onChange={onChange}
          id="length"
          type="number"
          name="length"
          min="1"
          max={totalCards}
          value={numCards}
        />
        <ButtonContainer>
          <button type="submit">Start</button>
        </ButtonContainer>
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
    height: 5rem;
    margin: 1rem;
`

const Title = styled.h2`
  height: 10rem;
`

const ButtonContainer = styled.div`
  height: 10rem;
  margin-top: 2rem;
`

export default DeckSettings