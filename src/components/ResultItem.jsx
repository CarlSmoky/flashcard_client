import React from 'react'
import styled from 'styled-components'
import Star from './Star'


const Result = ({
  term,
  definition,
  isLearning,
  fillStar,
  setCardProperty,
  cardId
}) => {

  const clickLearning = e => {
    e.stopPropagation();
    setCardProperty(cardId, 'isLearning',
      !isLearning);
  }

  return (
    <Wrapper>
      <div className="termDeifinitionWrapper">
        <div className='term'>
          <p>{term}</p>
        </div>
        <div className='verticalLine'></div>
        <div className='definition'>
          <p>{definition}</p>
        </div>
      </div>
      <div className="statusWrapper">
        <div className="star">
          <Star
            fillStar={fillStar}
            setCardProperty={setCardProperty}
            cardId={cardId}
          />
        </div>
        <div className='isLearning'>
          <p onClick={clickLearning}>
            {`${isLearning ? "L" : "K"}`}
          </p>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  min-height: 5rem;
  margin: 1rem auto 1rem;
  border-radius: .5rem;
  border: 2px solid var(--black-primary);
  background: var(--quaternary-color);

  .termDeifinitionWrapper {
    display: flex;
    width: 100%;
  }

  .term {
    width: 50%;
    text-align: left;

    p {
      margin: 1rem;
      font-size: 1.5rem;
      font-family: var(--tertiary-font);
    }
  }

  .verticalLine {
    border-right: 2px solid var(--black-primary);
    margin: 1rem 0;
  }

  .definition {
    width: 50%;
      
    p {
      margin: 1rem;
      text-align: left;
      font-size: 1.5rem;
      font-family: var(--tertiary-font);
    }
  }

  .statusWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }


  .star {
    svg {
      font-size: 1.5rem;
    }
  }
  
  .isLearning {
    p {
      padding: 0 .2rem;
      font-size: 1.6rem;
      font-family: var(--primary-font);
      font-weight: 400;
      text-transform: uppercase;
      cursor: pointer;
      transition: transform .1s ease-out;
      
      :hover {
        transform: scaleX(1.1) scaleY(1.1);
      }

      :active {
        text-decoration-line: underline;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;

    .term {
      p {
        margin: .2rem .5rem;
        font-size: 1.3rem;
      }
    }

    .definition {
      p {
        margin: .2rem .5rem;
        font-size: 1.3rem;
      }
    }

    .verticalLine {
    margin: .2rem 0;
  }

    .statusWrapper {
      flex-direction: row-reverse;

    .star {
      margin: auto;
      svg {
        padding: .2rem;
      }
  }

      .isLearning {
        margin: auto;
      p {
        padding: 0 .5rem;
        font-size: 1.3rem;
      }
    }
  }
}
`

export default Result