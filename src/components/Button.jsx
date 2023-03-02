import React from 'react'
import styled, { css } from 'styled-components'
import { modes } from '../helpers/modes'

const Button = ({
  text,
  disabled,
  nextCard,
  isEndCard,
  setCardProperty,
  cardId,
  isLearning,
  setComplete,
  setCurrent,
  current,
  setMode
}) => {

  const clickButtonHandle = e => {
    e.stopPropagation();
    
    // On Settings pop up, Start button clicked
    if (text === "Start") { return;}

    // On finish confirmation pop up, for Quit and Back to Deck button
    if (text === "Quit") {
      setMode(modes.finished);
      return;
    }

    if (text === "Back to Deck") {
      setCurrent(current);
      setMode(modes.answering);
      return;
    }

    // On card, for Learning and Know button
    if (!isEndCard) {
      nextCard();
    }
      
    const isLearning = e.target.innerHTML === "Learning";
      
    setCardProperty(cardId, 'isLearning', isLearning);
  }

  return (
    <ButtonStyle
      selected={isLearning}
      onClick={clickButtonHandle}
      disabled={disabled}
    >
      {text}
    </ButtonStyle>
  )
}

const ButtonStyle = styled.button`
  border-radius: .5rem;
  width: 45%;
  padding: 1rem;
  margin: 1rem 2rem;
  font-family: var(--tertiary-font);
  text-transform: uppercase;
  color: var(--black-primary);
  cursor: pointer;
  border: 2px solid var(--black-primary); 
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  & {
    color: ${props => props.selected ? "var(--white-primary)" : ""};
    background: ${props => props.selected ? "var(--black-primary)" : ""};
    opacity: ${props => props.selected ? "80%" : ""};: ;
    }

  ${({ disabled }) => {
    return disabled
      ? css`
      
      `
      : css`

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 4px;
        transform: scaleX(0);
        bottom: 0;
        left: 0;
        background-color: var(--primary-color);
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
      }

      &:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }

      &:active {
        box-shadow: 0px 0px 0px 0px;
        top: 5px;
        left: 5px;
      }
    `
  }}
`

export default Button