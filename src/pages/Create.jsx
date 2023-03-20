import React from 'react'
import styled from 'styled-components'
import CreateDeck from '../components/CreateDeck'
import CreateCards from '../components/CreateCards'


const Create = () => {
  return (
    <Wrapper>
      <CreateDeck/>
      <CreateCards/>
    </Wrapper>
  )
}

const Wrapper = styled.div`

`

export default Create