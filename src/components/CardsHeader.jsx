import React from 'react'
import styled, { css } from "styled-components"
import { RxCross2 } from 'react-icons/rx'
import { modes } from '../helpers/modes'

const CardsHeader = ({
  deck_name,
  selectedCardIndices,
  current,
  isModalMode,
  setMode
}) => {

  return (
    <CardsHeaderStyle className={isModalMode() && 'blur'}>
      <Left>
      </Left>
      <Center>
        <Header>{deck_name}</Header>
        {selectedCardIndices && selectedCardIndices.length > 0 ? (
          <CardCount>
            {current + 1} / {selectedCardIndices.length}
          </CardCount>
        ) : (
          ""
        )}
      </Center>
      <Right>
        <Button disabled={isModalMode()}>
          <RxCross2 onClick={() => setMode(modes.finishConfirmation)} />
        </Button>
      </Right>
    </CardsHeaderStyle>
  )
}

const CardsHeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  

  &.blur {
    filter: blur(2rem);
  }
`

const Left = styled.div`
  margin: 0 3.3rem;
`

const Center = styled.div`
width: 80%;
max-width: 70rem;
`

const Right = styled.div`
  margin: 2rem;
`

const Header = styled.h2`
  font-size: 2rem;
  text-align: left;
  max-width: 70rem;
  margin: 2rem auto 0;
`

const CardCount = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`

const Button = styled.button`
  margin: auto;
  
    svg {
    font-size: 2.5rem;
    padding: .2rem;
    stroke-width: 1.2;
    }

    ${({ disabled }) => {
    return disabled
      ? css`
      
      `
      : css`
      cursor: pointer;
      `
    }}
`


export default CardsHeader