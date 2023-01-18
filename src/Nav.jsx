import React from 'react'
import styled from 'styled-components'



const Nav = () => {
  return (
    <Wrapper className="nav">
      <img src="" alt="logo" />
      <h1>Flashcard</h1>
      <div>
        <a href="#home">
          
          <span className="screenreader-only">Home</span>
        </a>
        <a href="#home">
          
          <span className="screenreader-only">Home</span>
        </a>
        <a href="#home">
          
          <span className="screenreader-only">Home</span>
        </a>
        <a href="#home">
          
          <span className="screenreader-only">Home</span>
        </a>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`

`

export default Nav