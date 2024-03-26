import styled, { css } from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { modes } from "../helpers/modes";

const CardsHeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Left = styled.div`
  margin: 0 3.3rem;
`

const Center = styled.div`
width: 80%;
max-width: 70rem;
`

const Right = styled.div`
  margin: auto 2rem;
`

const Header = styled.h2`
  font-size: 1.7rem;
  text-align: left;
  max-width: 70rem;
  margin: 3rem auto 0;
  font-family: var(--primary-font);
  font-weight: 600;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`

const CardCount = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: var(--tertiary-font);

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`

const Button = styled.button`
  display: flex;
  justify-items: center;
  
    svg {
    font-size: 2.5rem;
    padding: .2rem;
    stroke-width: 1.2;
    filter: invert(10%) sepia(7%) saturate(7%) hue-rotate(349deg) brightness(93%) contrast(79%);
    }

    @media (max-width: 768px) {
      svg {
        font-size: 2rem;
        padding: .3rem;
      }
    }

    .visually-hidden:not(:focus):not(:active) {
      clip: rect(0 0 0 0); 
      clip-path: inset(100%); 
      height: 1px; 
      overflow: hidden; 
      position: absolute; 
      white-space: nowrap; 
      width: 1px; 
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

const CardsHeader = ({
  deckName,
  selectedCardIndices,
  current,
  isModalMode,
  setMode
}) => {

  return (
    <CardsHeaderStyle>
      <Left>
      </Left>
      <Center>
        <Header>{deckName}</Header>
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
          <span className="visually-hidden">Cancel Button</span>
        </Button>
      </Right>
    </CardsHeaderStyle>
  )
}

export default CardsHeader