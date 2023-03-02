import React from 'react'
import styled from 'styled-components'
import Button from './Button'


const Confimation = ( {
  setComplete,
  setCurrent,
  current,
  setConfirmation
}) => {

  const handleClick = (e) => {
    e.preventDefault();
  }
  
  return (
    <Wrapper>
      <form onSubmit={handleClick} >
        <h2>Do you want to finish?</h2>
        <Button
          text='Quit'
          setComplete={setComplete}
          setConfirmation={setConfirmation}
        />
        <Button
          text='Back to Deck'
          setCurrent={setCurrent}
          current={current}
          setConfirmation={setConfirmation}
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
  }
  
`

export default Confimation