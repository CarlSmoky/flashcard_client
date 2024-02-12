import React from 'react'
import styled from 'styled-components'
import { useNavigate, Link } from 'react-router-dom';

const Nav = () => {

  const navigate = useNavigate();

  return (
    <Wrapper className="nav">
      <h1>Flashcard</h1>
      <div className="links">
        <a onClick={()=> {navigate("/")}}>
          <span>Home</span>
        </a>
        <a onClick={()=> {navigate("/decklist")}}>
          <span>Decks</span>
        </a>
        <a onClick={()=> {navigate("/create")}}>
          <span>Create</span>
        </a>
        {/* <a onClick={()=> {navigate("/signup")}}>
          <span>Signup</span>
        </a>
        <a onClick={()=> {navigate("/login")}}>
          <span>Login</span>
        </a> */}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: stretch;
  height: 9rem;
  position: sticky;
  border-bottom: var(--side-column-border) solid var(--black-primary);

  h1 {
    margin: auto 0;
    padding-left: 1rem;
    font-size: 2rem;
    text-align: left;
    line-height: 0;
  }

  .links {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: var(--secondary-color);
    border-left: var(--side-column-border) solid var(--black-primary);
    padding: 2rem;

    a {
      margin: auto 0;
      width: 8rem;
      padding: 2rem;
      font-size: 1.3rem;
      transition: transform 0.1s ease-out;

      :hover {
        transform: scaleX(1.3) scaleY(1.3);
      }

      :active {
        text-decoration-line: underline;
      }

      span {
        text-transform: uppercase;
      }
    }
  }
`
export default Nav