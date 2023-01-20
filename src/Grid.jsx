import React from 'react'
import styled from 'styled-components'
import { BsCardText } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'
import Nav from './Nav'

const Grid = () => {
  return (
    <Wrapper>
      <div className="left">
        <div className="logo">
        <div>
          <BsCardText />
        </div>
        </div>
        <div className="bottom"></div>
      </div>
      <div className="center">
      <Nav/>
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
  border-top: .4rem solid var(--black-primary);
  border-bottom: .4rem solid var(--black-primary);
  
  .left {
    min-width: var(--side-grid);
    height: 100rem;
    border-right: var(--grid-border) solid var(--black-primary);
    border-left: var(--grid-border) solid var(--black-primary);

    .logo {
    padding: 1rem;
    min-width: 6.5rem;
    height: 7rem;
    border-bottom: .4rem solid var(--black-primary);

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
      position: fixed;
      bottom: 0;
      border-top: .4rem solid var(--black-primary);
    }
  }

  .right {
    min-width: var(--side-grid);
    height: 100rem;
    border-right: .4rem solid var(--black-primary);
    border-left: .4rem solid var(--black-primary);

    .search {
      padding: 1rem;
      min-width: 6.5rem;
      height: 7rem;
      border-bottom: .4rem solid var(--black-primary);

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
      min-width: 8.5rem;
      height: 9rem;
      position: fixed;
      bottom: 0;
      border-top: .4rem solid var(--black-primary);
    }
  }


  
`

export default Grid