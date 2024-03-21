import styled from "styled-components";
import { Link } from "react-router-dom";

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

    .card-side {
      width: 33.3%;
      height: 100%;
      border-top: .3rem solid var(--black-primary);
      display: flex;
      justify-content: center;
      align-items: center;

      h2 {
        font-size: 1.6rem;
        transition: transform 0.2s ease-in-out;

        &:hover {
          cursor: pointer;
          transform: scaleX(1.1) scaleY(1.1);
        }
      }
    }
    .card-middle {
      width: 33.3%;
      height: 100%;
      border-top: .3rem solid var(--black-primary);
      border-right: .3rem solid var(--black-primary);
      border-left: .3rem solid var(--black-primary);
      background: var(--primary-color);
      display: flex;
      justify-content: center;
      align-items: center;

      h2 {
        font-size: 1.6rem;
        transition: transform 0.2s ease-in-out;

        &:hover {
          cursor: pointer;
          transform: scaleX(1.1) scaleY(1.1);
        }
      }
    }
  }

  @media (max-width: 768px) {
    min-height: calc(100vh - 6rem - 6rem);

    .header {

      h1 {
        font-size: 1.4rem;
      }

      p {
        font-size: 1rem;
      }
    }
    .cards {
      flex-direction: column;
      justify-content: flex-end;

      .card-side {
        width: 100%;

        h2 {
          font-size: 1.4rem;
        }
      }

      .card-middle {
        width: 100%;
        border-right: none;
        border-left: none;

        h2 {
          font-size: 1.4rem;
        }
      }
    }
  }
`

const Menu = () => {

  return (
    <>
      <Wrapper>
        <div className="header">
          <div>
            <h1>The Lifelong Learning App anytime, anywhere.</h1>
            <p>Dokodemo Card is an innovative learning app designed to make memorization not just effective but also engaging. With Dokodemo Card, the power to learn is always at your fingertips, transforming downtime into productive study sessions.</p>
          </div>
        </div>
        <div className="cards">
          <Link className="card-side" to={`/decklist`}>
            <h2>Search</h2>
          </Link>
          <Link className="card-middle" to={`/decklist`}>
            <h2>Practice</h2>
          </Link>
          <Link className="card-side" to={`/create`}>
            <h2>Create</h2>
          </Link>
        </div>
      </ Wrapper>
    </>
  )
}



export default Menu