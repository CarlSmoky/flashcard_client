import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { BsCardText } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'
import Nav from './Nav'
import Menu from './Menu'
import Decks from './Decks'
import Footer from './Footer'

const Grid = ({ content }) => {

return (
  <Wrapper >
    <div className="left">
      <div className="logo">
        <div>
          <BsCardText />
        </div>
      </div>
      <div className="middle"></div>
      <div className="bottom"></div>
    </div>
    <div className="center">
      <Nav />
      {content === "menu" && <Menu />}
      {content === "decks" && <Decks />}
      <Footer />
    </div>
    <div className="right">
      <div className="search">
        <div>
          <BiSearch />
        </div>
      </div>
      <div className="middle">
      </div>
      <div className="bottom"></div>
    </div>
  </Wrapper>
)
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
  border-top: var(--side-column-border) solid var(--black-primary);
  border-bottom: var(--side-column-border) solid var(--black-primary);
  
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: var(--side-column-width);
    height: {height};
    border-right: var(--side-column-border) solid var(--black-primary);
    border-left: var(--side-column-border) solid var(--black-primary);

    .logo {
    padding: 1rem;
    min-width: 6.5rem;
    height: 7rem;
    border-bottom: var(--side-column-border) solid var(--black-primary);

      div {
        margin: 1.2rem;
        text-align: center;
        svg {
          font-size: 4rem;
        }
      }
    }

    .bottom {
      padding: 1rem;
      min-width: 6.5rem;
      height: 7rem;
      border-top: var(--side-column-border) solid var(--black-primary);
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: var(--side-column-width);
    border-right: var(--side-column-border) solid var(--black-primary);
    border-left: var(--side-column-border) solid var(--black-primary);

    .search {
      padding: 1rem;
      min-width: 6.5rem;
      height: 7rem;
      border-bottom: var(--side-column-border) solid var(--black-primary);

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
    
    .bottom {
      position: relative;
      bottom: 0;
      min-width: 8.5rem;
      height: 9rem;
      border-top: var(--side-column-border) solid var(--black-primary);
    }
  }


  
`

export default Grid