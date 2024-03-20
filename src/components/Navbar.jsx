import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 9rem;
  border-bottom: var(--side-column-border) solid var(--black-primary);

  .logo {
    padding: 1.5rem;
    margin: auto 0;
    font-size: 2.5rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    height: 6rem;

    .logo {
    font-size: 2rem;
  }
  }
`

const Navbar = () => {
  return (
    <Nav>
      <div className="logo">
        FlashCard!
      </div>
      <Burger />
    </Nav>
  )
}

export default Navbar