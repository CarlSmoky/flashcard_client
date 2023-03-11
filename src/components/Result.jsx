import React from 'react'
import styled, { css } from 'styled-components'

const Result = (stat) => {

  console.log(stat);

  return (
    <Wrapper>Result</Wrapper>
  )
}

const Wrapper = styled.div`
  width: 98%;
  height: 10rem;
  margin: 0 auto 2rem;
  border-radius: .5rem;
  border: 2px solid var(--black-primary);
  background: var(--tertiary-color);
`

export default Result