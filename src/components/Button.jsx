import React from 'react'
import styled, { css } from 'styled-components'

const Button = ({ text, disabled, nextCard, isEndCard }) => {

  const clickButtonHandle = e => {
    e.stopPropagation();
    if (text === "Start") { return; }
    if (!isEndCard) { nextCard(); }
  }

  return (
    <ButtonStyle
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

  ${({ disabled }) => {
  return disabled
    ? css`
      
    `
    :css`
      &:hover {
      box-shadow: 0px 0px 0px 0px;
      top: 5px;
      left: 5px;
      }

      &:active {
        transform: translateY(4px);
      }
    `
}}
`

export default Button