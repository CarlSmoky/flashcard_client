import React from 'react'
import styled from 'styled-components'
import { BsCardText } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';



const Nav = () => {
  return (
    <Wrapper className="nav">
      <div className="logo">
        <div>
          <BsCardText />
        </div>
      </div>
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
      <div className="search">
        <div>
          <BiSearch />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  height: 9rem;
  position: fixed;
  border: .4rem solid var(--black-primary);

  .logo {
    padding: 1rem;
    width: 8rem;
    max-width: 10rem;
    height: 7rem;
    border-right: .3rem solid var(--black-primary);

    div {
      margin: 1.2rem;
      text-align: center;
      svg {
        font-size: 4rem;
      }
    }

  }
  h1 {
    margin: auto 0;
    padding-left: 1rem;
    font-size: 3rem;
    width: 40rem;
    max-width: 60rem;
    text-align: left;
    line-height: 0;
  }

  .links {
    width: 100rem;
    max-width: 150rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: var(--secondary-color);
    border-left: .3rem solid var(--black-primary);

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

  .search {
    margin: auto 0;
    width: 10rem;
    height: 7rem;
    padding: 1rem 0 1rem 0;
    border-left: .3rem solid var(--black-primary);
    div {
      margin: 1.2rem;
      text-align: center;
      svg {
        font-size: 4rem;
      }
      :hover {
        transform: scaleX(1.4) scaleY(1.6);
      }
  }
}
`

export default Nav