import React from 'react'
import styled from 'styled-components'
import Footer from './Footer'

const Home = () => {
  return (
    <>
      <Wrapper>
        <div className="left">left</div>
        <div className="center">
          <div className="header">
            <h1>Memorize anything with free digital flashcards</h1>
            <p>Lorem Ipsum is simply dummy text of the
              printingand typesetting industry. </p>
          </div>
          <div className="contents">
            <div className="card">
              <h2>Search Deck</h2>
              <p></p>
            </div>
            <div className="card">
              <h2>Create Deck</h2>
              <p></p>
            </div>
            <div className="card">
              <h2>Practice</h2>
              <p></p>
            </div>
          </div>
        </div>
        <div className="right">right</div>
      </ Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  
  .left {
    min-width: 8.5rem;
    height: 100vh;
    border-right: .4rem solid var(--black-primary);
    border-left: .4rem solid var(--black-primary);
  }

  .right {
    min-width: 8.5rem;
    height: 100vh;
    border-right: .4rem solid var(--black-primary);
    border-left: .4rem solid var(--black-primary);
  }

  .contents {
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-width: 100rem;
    .card {
      width: 30%;
      height: 30rem;
      border: .3rem solid var(--black-primary);
    }
  }
`

export default Home