import styled from 'styled-components'

const Menu = () => {

  return (
    <>
      <Wrapper>
        <div className="header">
          <div>
            <h1>Memorize anything with free digital flashcards</h1>
            <p>Lorem Ipsum is simply dummy text of the
              printingand typesetting industry. </p>
          </div>
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
  justify-content: space-between;
  margin: auto;
  height: 50%;
  min-height: calc(100vh - 9.3rem - 9.3rem);

  
  
  .header {
    margin: auto;
    padding: 1rem;

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
    align-items: flex-end;
    width: 100%;
    height: 50%;

    .card-1 {
      width: 33.3%;
      height: 100%;
      border-top: .3rem solid var(--black-primary);

      h2 {
        font-size: 1.6rem;
      }
    }
    .card-2 {
      width: 33.3%;
      height: 100%;
      border-top: .3rem solid var(--black-primary);
      border-right: .3rem solid var(--black-primary);
      border-left: .3rem solid var(--black-primary);
      background: var(--primary-color);

      h2 {
        font-size: 1.6rem;
      }
    }
    .card-3 {
      width: 33.3%;
      height: 100%;
      border-top: .3rem solid var(--black-primary);

      h2 {
        font-size: 1.6rem;
      }
    }
  }

  @media (max-width: 768px) {
    min-height: calc(100vh - 6rem - 6rem);

    .header {

      h1 {
        font-size: 1.6rem;
      }

      p {
        font-size: 1.3rem;
      }
    }
    .cards {
      flex-direction: column;
      justify-content: flex-end;

      .card-1 {
        width: 100%;

        h2 {
          font-size: 1.4rem;
        }
      }

      .card-2 {
        width: 100%;
        border-right: none;
        border-left: none;

        h2 {
          font-size: 1.4rem;
        }
      }

      .card-3 {
        width: 100%;
        border-bottom: none;

        h2 {
          font-size: 1.4rem;
        }
      }
    }
  }
`

export default Menu