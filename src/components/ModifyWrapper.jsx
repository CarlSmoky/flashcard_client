import React from 'react'
import styled, { css } from 'styled-components'
import UpdateConfirmation from './UpdateConfirmation'
import DeckDetailsForm from './DeckDetailsForm'
import CardFormHeader from './CardFormHeader'
import { GrAddCircle } from 'react-icons/gr'
import Button from './Button'
import { useModal } from '../providers/ModalProvider'
import { defaultEditableDeck } from '../helpers/defaultEditableData'


const ModifyWrapper = (
  {
    error,
    editableDeck,
    setEditableDeck,
    editableCards,
    cardFormItems,
    updateResult,
    handleSaveClick,
    disableButton,
    handleOk,
    createNewCard
  }
) => {

  const { modalActivated } = useModal();

  return (
    <>
      {modalActivated &&
        <UpdateConfirmation
          updateResult={updateResult}
          handleOk={handleOk}
        />}
      <Wrapper className={modalActivated ? 'blur' : null}>
        <Title>Edit Deck</Title>
        <div className='error'>
          <p>{error}</p>
        </div>
        <form>
          {editableDeck && <DeckDetailsForm
            deckContents={editableDeck || defaultEditableDeck}
            setDeckContents={setEditableDeck}
          />}
          <CardFormHeader />
          {editableCards && cardFormItems}
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
    </>
  )
}

const Title = styled.h1`
  width: 98%
  font-size: 2rem;
  text-align: left;
  margin: 2rem 0;
  padding: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;

  &.blur {
    filter: blur(.6rem);
  }
`

const Wrapper = styled.div`
  min-height: calc(100vh - 9.3rem - 9.3rem);

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
        transform: scaleX(1.2) scaleY(1.2);
        }

        &:active {
          background: var(--white-primary);
          color: var(--black-primary);
        }
      `
  }}
    }
`

export default ModifyWrapper