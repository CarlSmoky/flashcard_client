import styled, { css } from "styled-components";
import { errorMessage } from "../helpers/utilities";
import { updateStatus } from "../helpers/defaultEditableData";
import { useModal } from "../providers/ModalProvider";

const absoluteStyle = css`
  width: 95%;
  margin-left: 1rem;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  background-color: var(--quaternary-color);
  resize: none;
  font-size: 1.7rem;
  font-family: var(--tertiary-font);
`

const Wrapper = styled.div`
  width: 98%;
  height: 20rem;
  margin: 1rem auto 1rem;
  border: 2px solid var(--black-primary);
  background: var(--tertiary-color);
  text-align: left;
  background: var(--quaternary-color);

    label {
      display: block;
      padding: 1rem;
      font-size: 1.5rem;
      font-family: var(--secondary-font);
      font-weight: 200;
      text-transform: uppercase;

      span {
        color: red;
      }
    }

    input {
      border-bottom-style: groove;
      ${absoluteStyle}
    }

    textarea {
      border-bottom-style: hidden;
      ${absoluteStyle}
    }

    textarea:focus, input:focus{
    outline: none;
    }

    p {
      height: 2rem;
      margin-left: 1rem;
      font-family: var(--tertiary-font);
      font-size: 1.4rem;
      color: red;
    }
`

const DeckDetailsForm = ({
  deckContents,
  setDeckContents
}) => {

  const { modalActivated } = useModal()

  const onChangeDeck = (e) => {
    const returnedError = errorMessage(e.target.name, e.target.value);

    const updatedDeck = {
      ...deckContents,
      [e.target.name]: e.target.value,
      errors:
      {
        ...deckContents.errors,
        [returnedError.key]: returnedError.message
      },
      modifications: {
        ...deckContents.modifications,
        [e.target.name]: true
      },
      updateStatus: updateStatus.edited
    }

    setDeckContents(updatedDeck);
  };
  
  return (
    <Wrapper>
      <div>
        <label htmlFor="deckName">Title <span>*</span></label>
        <input
          onChange={onChangeDeck}
          type="text"
          name="deckName"
          id="deckName"
          value={deckContents.deckName}
          placeholder="Enter deck name here"
          disabled={modalActivated}
        />
        <p>{deckContents.errors.deckName}</p>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          onChange={onChangeDeck}
          type="text"
          name="description"
          id="description"
          value={deckContents.description}
          placeholder="Enter deck description here"
          disabled={modalActivated}
        />
        <p>{deckContents.errors.description}</p>
      </div>
    </Wrapper>
  )
}

export default DeckDetailsForm