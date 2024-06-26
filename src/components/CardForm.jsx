import styled, { css } from "styled-components";
import { generateErrorMessage } from "../helpers/utilities";
import { RiDeleteBin5Line } from "react-icons/ri";
import { updateStatus } from "../helpers/defaultEditableData";
import { useModal } from "../providers/ModalProvider";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  height: 15rem;
  margin: 1rem auto 1rem;
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
    height: 11rem;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
    background-color: var(--tertiary-color);
    resize: none;
    font-size: 1.7rem;
    font-family: var(--tertiary-font);
    font-weight: 400;
  }


  textarea:focus {
    outline: none;
  }
`

const Binbutton = styled.button`
  margin: auto 1rem;
  color: var(--grey-secondary );
  
  svg {
    font-size: 2.5rem;
    transition: transform 0.3s ease-in-out;
    
    
    ${({ disabled }) => {
      return disabled
      ? css`
        cursor: not-allowed;
      `
      : css`
        cursor: pointer;

        &:hover {
          transform: scaleX(1.1) scaleY(1.1);
          color: var(--grey-primary);
        }

        &:active {
          transform: scaleX(1.1) scaleY(1.1);
          color: var(--grey-primary);

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

const CardForm = ({
  editCardContents,
  card,
  index,
  deleteCardForm
}) => {
  const { modalActivated } = useModal()
  const maxLength = 500;

  const onChangeCard = (e) => {
    const returnedError = generateErrorMessage(e.target.name, e.target.value, maxLength);

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
          disabled={modalActivated}
          className="bin">
          <RiDeleteBin5Line />
          <span className="visually-hidden">Add Card Button</span>
        </Binbutton>
    </Wrapper>
  )

  return (
   card.updateStatus === updateStatus.deleted ? <></> : renderedCard 
  )
}

export default CardForm