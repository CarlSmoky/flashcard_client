import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { modes } from '../helpers/modes'

const Confimation = ({
  current,
  setMode,
  addLoadedCards
}) => {

  const handleSubmitClick = (e) => {
    e.preventDefault();
  }

  const handleQuit = () => {
    addLoadedCards(current);
    setMode(modes.finished);
  }
  const handleBackToDeck = () => {
    setMode(modes.answering);
  }
  

  return (
    <Wrapper>
      <form onSubmit={handleSubmitClick}>
        <h2>Do you want to finish?</h2>
        <Button
          text='Quit'
          onButtonClick={handleQuit}
        />
        <Button
          text='Back to Deck'
          onButtonClick={handleBackToDeck}
        />
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
  width: 40rem;
  height: 30rem;
  background: var(--primary-color);
  border: var(--side-column-border) solid var(--black-primary);
  border-radius: 1rem;
  z-index: 100;

  h2 {
    font-size: 2rem;
    margin: 6.5rem 0 6rem;
    text-transform: uppercase;
  }
  
`

export default Confimation