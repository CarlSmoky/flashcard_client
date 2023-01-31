import React from 'react'
import styled from 'styled-components'
import { RxCross2 } from 'react-icons/rx'

const DeckSettings = ({ setNumCard, id }) => {
  return (
    <Wrapper>
      <form action="/deck/:id" type="post">
        <h1>{id}</h1>
        <RxCross2 />
        <input id="number" type="number" value="0" />
        <button type='submit'>Start</button>
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
  z-index: 100;
`

export default DeckSettings