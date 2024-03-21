import styled from "styled-components";
import Button from "./Button";
import { modes } from "../helpers/modes";

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
  width: 35%;
  min-width: 40rem;
  height: 35%;
  min-height: 30rem;
  background: var(--primary-color);
  border: 2px solid var(--black-primary);
  z-index: 10;

  h2 {
    font-size: 2rem;
    margin: 6.5rem 0 6rem;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    width: 50%;
    min-width: 30rem;

    h2 {
    font-size: 1.6rem;
    }
  }

  @media (max-width: 488px) {
    width: 75%;
    min-width: 20rem;

    h2 {
      font-size: 1.3rem;
    }
  }
`

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
          text='Done'
          buttonType="button"
          onButtonClick={handleQuit}
        />
        <Button
          text='Back to Deck'
          buttonType='button'
          onButtonClick={handleBackToDeck}
        />
      </form>
    </Wrapper>
  )
}

export default Confimation