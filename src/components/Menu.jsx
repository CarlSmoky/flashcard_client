import React from 'react'
import styled from 'styled-components'

const Menu = () => {
  return (
    <>
      <Wrapper>
          <div className="header">
            <h1>Memorize anything with free digital flashcards</h1>
            <p>Lorem Ipsum is simply dummy text of the
              printingand typesetting industry. </p>
          </div>
          <div className="cards">
            <div className="card-1">
              <h2>Search Deck</h2>
              <p></p>
            </div>
            <div className="card-2">
              <h2>Create Deck</h2>
              <p></p>
            </div>
            <div className="card-3">
              <h2>Practice</h2>
              <p></p>
            </div>
          </div>
      </ Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100vw - 9.3rem - 9.3rem);
  height: 79rem;
  
  .header {
    height: 10rem;
    padding: 10rem;
    h1 {
      font-size: 2rem;
      text-align: center;
    }

    p {
      font-size: 1.5rem;
      text-align: center;
    }
  }

  .cards {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: calc(100vw - 9.3rem - 9.3rem);
    .card-1 {
      width: 34%;
      height: 30rem;
      border-top: .3rem solid var(--black-primary);
      border-bottom: .3rem solid var(--black-primary);
    }
    .card-2 {
      width: 33%;
      height: 30rem;
      border: .3rem solid var(--black-primary);
      background: var(--primary-color);
    }
    .card-3 {
      width: 34%;
      height: 30rem;
      border-top: .3rem solid var(--black-primary);
      border-bottom: .3rem solid var(--black-primary);
    }
  }
`

export default Menu