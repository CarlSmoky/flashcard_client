import React from 'react'
import styled from 'styled-components'

const Button = ({ text, color }) => {

  const clickButtonHandle = e => {
    e.stopPropagation();
    console.log("clicked", e.target);
  }


  return (
    <ButtonStyle
      className={color}
      onClick={clickButtonHandle}
    >
      {text}
    </ButtonStyle>
  )
}

const ButtonStyle = styled.button`
  border-radius: .5rem;
  width: 45%;
  padding: 1rem;
  margin: 1rem;
  color: transparent;
  color: var(--black-primary);
  cursor: pointer;

  &.black {
    border: 2px solid var(--black-primary); 
    color: var(--black-primary);
  }

  &.white {
    border: 2px solid var(--white-primary); 
    color: var(--white-primary);
  }
`

export default Button