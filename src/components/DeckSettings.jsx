import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { RxCross2 } from 'react-icons/rx'

const DeckSettings = ({ setNumCard, id }) => {

  const [length, setLength] = useState(0);
  const [message, setMessage] = useState("");
  const [deck, setDecks] = useState("");
  const {deck_name} = deck;
  

  useEffect(() => {
    axios.get(`api/deck/${id}`)
    .then(res => {
      const deckById = res.data;
      setDecks(deckById);
    })
    .catch (err => {
      console.log(err)
    })
  }, []);

  const onChange = (e) => setLength(e.target.value);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (length === 0) setMessage("Set a number of cards here")
    setNumCard(length);
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
        {deck && <Title>{deck_name}</Title>}
        <label>Cards: </label>
        <input
          onChange={onChange}
          id="length"
          type="number"
          name="length"
          min="0"
          max="100"
          placeholder="0"
        />
        {message && <p>{message}</p>}
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