import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 98%;
  margin: 3rem auto 0;

  h2 {
    font-size: 1.7rem;
    text-transform: uppercase;
    word-wrap: break-word;
    text-align: left;
  }

  div {
    display: flex;
    flex-direction: column;
    min-width: 15rem;
  }

  p {
    font-size: 1.3rem;
    font-family: var(--primary-font);
    text-align: right;
    text-transform: uppercase;

    span {
      display: inline-block;
      width: 3rem;
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    margin: 2rem auto 0;

    h2 {
    font-size: 1.4rem;
    }

    div {
    min-width: 13rem;
    }

    p {
      font-size: 1rem;
    }
  }
`

const ResultHeader = ({
  deckName,
  numCards,
  numLearning
}) => {
  return (
    <Wrapper>
      <h2>{deckName}</h2>
      <div>
        <p>Learning: <span>{numLearning}</span></p>
        <p>Know: <span>{numCards - numLearning}</span></p>
        <p>Total cards: <span>{numCards}</span></p>
      </div>
    </Wrapper>
  )
}



export default ResultHeader