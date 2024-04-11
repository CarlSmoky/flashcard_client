import styled, { css } from "styled-components";
import { useModal } from "../providers/ModalProvider";
import { GrAddCircle } from "react-icons/gr";
import { defaultEditableDeck } from "../helpers/defaultEditableData";
import DeckDetailsForm from "./DeckDetailsForm";
import CardFormHeader from "./CardFormHeader";
import Button from "./Button";

const Title = styled.h1`
  font-size: 1.8rem;
  text-align: left;
  margin: 2rem 0;
  padding: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;

  &.blur {
    filter: blur(.6rem);
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin: 1rem;
    padding: .8rem;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 9.3rem - 9.3rem);

  @media (max-width: 768px) {
    min-height: calc(100vh - 6rem - 6rem);
  }

  &.blur {
    filter: blur(.6rem);
  }

  .error {
    width: 98%;
    height: 2.3rem;
    margin: 1rem auto 0;

    p {
      margin-left: 1rem;
      font-family: var(--tertiary-font);
      font-weight: 400;
      font-size: 1.4rem;
      color: red;
      text-align: left;
    }
  }

  .addBtnContainer {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`

const AddButton = styled.button`
  margin-right: 2.1rem;

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
          transform: scaleX(1.1) scaleY(1.1);
          }

          &:active {
            background: var(--white-primary);
            color: var(--black-primary);
          }
        `
  }}
  }

  @media (max-width: 768px) {
    margin-right: .8rem;
    svg {
      font-size: 2.2rem;
    }
  }
`

const ModifyWrapper = (
  {
    error,
    deckContents,
    setDeckContents,
    cardFormItems,
    handleSaveClick,
    disableButton,
    createNewCard,
    headerText
  }
) => {

  const { modalActivated } = useModal();

  return (
    <Wrapper className={modalActivated ? 'blur' : null}>
      <Title>{headerText}</Title>
      <div className='error'>
        <p>{error}</p>
      </div>
      <form>
        <DeckDetailsForm
          deckContents={deckContents || defaultEditableDeck}
          setDeckContents={setDeckContents}
        />
        <CardFormHeader />
        {cardFormItems}
        <div className="addBtnContainer">
          <AddButton
            onClick={createNewCard}
            type='button'
            disabled={modalActivated}>
            <GrAddCircle />
            <span className="visually-hidden">Add Card Button</span>
          </AddButton>
        </div>
        <Button
          text='Save'
          buttonType='submit'
          onButtonClick={handleSaveClick}
          disabled={disableButton() || modalActivated}
        />
      </form>
    </Wrapper>
  )
}

export default ModifyWrapper