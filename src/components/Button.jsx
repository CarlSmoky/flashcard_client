import React from 'react'
import styled, { css } from 'styled-components'

const Button = ({
  text,
  buttonType,
  onButtonClick, 
  disabled,
  isSelected
}) => {
  
  const handleButtonClick = e => {
    buttonType === 'submit'? e.preventDefault() : e.stopPropagation();

    if (onButtonClick) {
      onButtonClick();
      return;
    }
  }

  return (
    <ButtonStyle
      selected={isSelected}
      onClick={handleButtonClick}
      disabled={disabled}
      type={buttonType}
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
  font-family: var(--primary-font);
  font-weight: 600;
  text-transform: uppercase;
  color: var(--black-primary);
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
      cursor: pointer;
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