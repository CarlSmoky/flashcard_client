import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { generateUpdateMsg } from '../helpers/utilities'

const UpdateConfirmation = (
  {
    handleOk,
    updateResult
  }
) => {
  const displayMsg = generateUpdateMsg((updateResult)).map(msg => <p>{msg}</p>);

  return (
    <Wrapper>
      <form>
        <h2>Updated</h2>
        <div>
          <p>{displayMsg}</p>
        </div>
        <Button
          text='Ok'
          buttonType="button"
          onButtonClick={handleOk}
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
  width: 35%;
  min-width: 40rem;
  height: 35%;
  min-height: 30rem;
  background: var(--primary-color);
  border: var(--side-column-border) solid var(--black-primary);
  border-radius: 1rem;
  z-index: 10;

  h2 {
    font-size: 2rem;
    margin: 3.5rem 0 3rem;
  }

  div {
    height: 11rem;
  }
  p {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 50%;
    min-width: 30rem;
  }

  @media (max-width: 488px) {
    width: 75%;
    min-width: 20rem;
  }
  
`

export default UpdateConfirmation