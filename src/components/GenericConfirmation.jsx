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
  min-height: 30rem;
  background: var(--primary-color);
  border: 2px solid var(--black-primary);
  z-index: 10;

  h2 {
    font-size: 2.5rem;
    margin: 4rem;
    font-family: var(--secondary-font);
    text-transform: uppercase;
  }

  div {
    margin: 1rem;
  }

  p {
    font-size: 1.5rem;
    font-family: var(--secondary-font);
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
      font-size: 2rem;
    }

    p {
      font-size: 1.3rem;
    }
  }
`

const GenericConfirmation = ({ header, text, children }) => {
  return (
    <Wrapper>
      {!header ? <LoadingSpinner/> : 
      <form>
        <h2>{header}</h2>
        {text &&
          <div>
            {text}
          </div>
        }
        {children}
      </form>}
    </Wrapper>
  )
}

export default GenericConfirmation