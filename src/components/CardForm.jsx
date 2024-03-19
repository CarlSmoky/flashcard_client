import React from 'react'
import styled, { css } from 'styled-components'
import { errorMessage } from '../helpers/utilities'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { updateStatus } from '../helpers/defaultEditableData'
import { useModal } from '../providers/ModalProvider'

const CardForm = ({
  editCardContents,
  card,
  index,
  deleteCardForm
}) => {

  const { modalActivated } = useModal()

  const onChangeCard = (e) => {
    const returnedError = errorMessage(e.target.name, e.target.value);

    const updatedCard = {
      ...card,
      [e.target.name]: e.target.value,
      errors:
      {
        ...card.errors,
        [returnedError.key]: returnedError.message
      },
      modifications: {
        ...card.modifications,
        [e.target.name]: true
      },
      updateStatus: updateStatus.edited
    }

    editCardContents(index, updatedCard);
  };

  const deleteNewCard = (e) => {
    e.preventDefault();
    deleteCardForm(index);
  }

  const renderedCard = (
    <Wrapper>
      <div className='term'>
        <textarea
          onChange={onChangeCard}
          type="text"
          name="term"
          id="term"
          value={card.term}
          aria-label="term"
          placeholder="Enter term here"
          disabled={modalActivated}
        />
        <p>{card.errors.term}</p>
      </div>
      <div className='verticalLine'></div>
      <div className='definition'>
        <textarea
          onChange={onChangeCard}
          type="text"
          name="definition"
          id="definition"
          value={card.definition}
          aria-label="definition"
          placeholder="Enter definition here"
          disabled={modalActivated}
        />
        <p>{card.errors.definition}</p>
      </div>
        <Binbutton
          onClick={deleteNewCard}
          disabled={modalActivated}>
          <RiDeleteBin5Line />
          <span className="visually-hidden">Add Card Button</span>
        </Binbutton>
    </Wrapper>
  )

  return (
   card.updateStatus === updateStatus.deleted ? <></> : renderedCard 
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  /* height: 11rem; */
  margin: 1rem auto 1rem;
  border-radius: .3rem;
  border: 2px solid var(--black-primary);
  background: var(--tertiary-color);

  .term, .definition {
    width: 50%;
    margin: 1rem;

    p {
      height: 2rem;
      font-family: var(--tertiary-font);
      font-size: 1.4rem;
      color: red;
      text-align: left;
    }
  }

  .verticalLine {
    border-right: 2px solid var(--black-primary);
    margin: 1rem 0;
  }

  textarea {
    width: 100%;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
    background-color: var(--tertiary-color);
    resize: none;
    font-size: 1.7rem;
    font-weight: 100;
    font-family: var(--tertiary-font);
  }

  textarea:focus {
    outline: none;
  }

  .bin {
    margin: auto 0;

    button {
      padding: .5rem;
      font-size: 2.5rem;
      cursor: pointer;
      transition: transform 0.2s ease-out;
  
      &:hover {
        cursor: pointer;
        transform: scaleX(1.2) scaleY(1.2);
      }
    }
  }

`

const Binbutton = styled.button`
  margin: auto 1rem;

  svg {
      font-size: 3rem;
      transition: transform 0.2s ease-out;

      ${({ disabled }) => {
      return disabled
        ? css`
        
        `
        : css`
        cursor: pointer;

        &:hover {
        cursor: pointer;
        transform: scaleX(1.2) scaleY(1.2);
        }

        &:active {
          background: var(--white-primary);
          color: var(--black-primary);
        }
      `
      }}
    }

    @media (max-width: 768px) {
      svg {
      font-size: 2rem;
      }
    }
`

export default CardForm