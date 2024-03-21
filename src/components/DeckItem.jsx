import React from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { truncate } from '../helpers/utilities'
import { AiOutlineEdit } from 'react-icons/ai'

const DeckItem = ({ id, deckName, description }) => {

  let navigate = useNavigate();

  return (
    <Wrapper >
      <Header>
        <button onClick={() => navigate(`/edit/${id}`)}>
          <AiOutlineEdit />
          <span className="visually-hidden">Edit Button</span>
        </button>
      </Header>
      <Link to={`/deck/${id}`}>
        <ClickArea>
          <h1>{truncate(deckName, 35)}</h1>
          <p>{truncate(description, 65)}</p>
        </ClickArea>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: calc(33% - 1rem);
  aspect-ratio: 16 / 9;
  border: .3rem solid var(--black-primary);
  background: var(--tertiary-color);
  border-radius: .3rem;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    box-shadow: 0 3px 3px var(--black-primary);
  }
  
  &:active {
    transform: translateY(4px);
  }

  @media (max-width: 1200px) {
    width: calc(32% - 1rem);
  }

  @media (max-width: 768px) {
    width: calc(49% - 1rem);
  }

  @media (max-width: 488px) {
    width: 100%;
  }
  `
  
  const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  
    button {
      transition: transform .1s ease-out;
      padding: .5rem;
      color: #2E2E2E;
  
      &:hover {
      cursor: pointer;
      transform: scaleX(1.2) scaleY(1.2);
      }
    }
  
    svg {
      font-size: 2rem;
    }
  `

const ClickArea = styled.div`
  width: 100%;
  height: 82%;
  
  h1 {
    width: 90%;
    height: 6rem;
    margin: 0 1rem 1rem 1rem;
    font-family: var(--secondary-font);
    font-weight: 200;
    font-size: 2rem;
    text-transform: uppercase;
    text-align: left;
    overflow-wrap: break-word;
  }

  p {
    width: 90%;
    margin: 0 1.5rem;
    text-align: left;
    font-size: 1.3rem;
    font-family: var(--tertiary-font);
    overflow-wrap: break-word;

  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.6rem;
    }
    p {
      font-size: 1rem;
    }
  }

  @media (max-width: 488px) {
    width: 100%;
  }
`


export default DeckItem