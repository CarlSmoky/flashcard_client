import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const holizontal = () => {
  return `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  list-style: none;
  text-align: center;
  `
}

const Wrapper = styled.div`
  ${holizontal};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 35%;
  min-width: 40rem;
  height: 35%;
  min-height: 30rem;
  background: var(--primary-color);
  border: 2px solid var(--black-primary);
  z-index: 10;

  h2 {
    font-size: 2rem;
    margin: 4rem;
    text-transform: uppercase;
  }

  div {
    margin: 1rem;
  }

  p {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 50%;
    min-width: 30rem;

    h2 {
      font-size: 1.6rem;
    }

    p {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 488px) {
    width: 75%;
    min-width: 20rem;

    h2 {
      font-size: 1.3rem;
    }

    p {
      font-size: 1rem;
    }
  }
`

const GenericConfirmation = ({ text, info, children }) => {
  return (
    <Wrapper>
      {!text ? <LoadingSpinner/> : 
      <form>
        <h2>{text}</h2>
        {info &&
          <div>
            {info}
          </div>
        }
        {children}
      </form>}
    </Wrapper>
  )
}

export default GenericConfirmation