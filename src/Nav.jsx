import React from 'react'
import styled from 'styled-components'

const Nav = () => {
  return (
    <Wrapper className="nav">
      <h1>Flashcard</h1>
      <div className="links">
        <a href="#home">
          <span>Home</span>
        </a>
        <a href="#contact">
          <span>Contact</span>
        </a>
        <a href="#signup">

          <span>Signup</span>
        </a>
        <a href="#login">
          <span>Login</span>
        </a>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: stretch;
  /* want to use variable here*/
  width: calc(100vw - 9.3rem - 9.3rem);
  height: 9rem;
  position: sticky;
  border-bottom: .4rem solid var(--black-primary);

  h1 {
    margin: auto 0;
    padding-left: 1rem;
    font-size: 3rem;
    /* min-width: 50rem; */
    text-align: left;
    line-height: 0;
  }

  .links {
    /* width: 123rem; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: var(--secondary-color);
    border-left: .4rem solid var(--black-primary);

    a {
      margin: auto 0;
      width: 8rem;
      padding: 3rem;
      font-size: 1.3rem;
      :hover {
        transform: scaleX(1.4) scaleY(1.6);
        text-decoration-line: underline;
      }
    }
  }
`
export default Nav