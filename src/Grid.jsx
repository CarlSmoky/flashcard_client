import React from 'react'
import styled from 'styled-components'
import { BsCardText } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'
import Nav from './Nav'
import Home from './Home'

const Grid = () => {
  return (
    <Wrapper>
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
      <Nav/>
      <Home/>
      </div>
      <div className="right">
        <div className="search">
        <div>
          <BiSearch />
        </div>
        </div>
        <div className="middle"></div>
        <div className="bottom"></div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  border-top: var(--side-column-border) solid var(--black-primary);
  border-bottom: var(--side-column-border) solid var(--black-primary);
  
  .left {
    min-width: var(--side-column-width);
    height: 90rem;
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

    .middle {
      height: 71.6rem;
    }

    .bottom {
      padding: 1rem;
      min-width: 6.5rem;
      height: 7rem;
      border-top: var(--side-column-border) solid var(--black-primary);
    }
  }

  .right {
    min-width: var(--side-column-width);
    height: 90rem;
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

    .middle {
      height: 71.6rem;
    }
    
    .bottom {
      min-width: 8.5rem;
      height: 9rem;
      border-top: var(--side-column-border) solid var(--black-primary);
    }
  }


  
`

export default Grid