import React from "react";
import styled, { css } from "styled-components";
import Card from "../components/Card";
import Arrow from "../components/Arrow";
import { modes } from "../helpers/modes";
import { RxCross2 } from "react-icons/rx";

const CardsHeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem;

  &.blur {
    filter: blur(2rem);
  }

  h2 {
    font-size: 2rem;
    text-align: center;
    font-family: var(--secondary-font);
    font-weight: 600;
    text-transform: Uppercase;
  }

  span {
    font-size: 1.6rem;
    font-family: var(--tertiary-font);
    
  }

  @media (max-width: 768px) {
    margin: 1rem;
    h2 {
    font-size: 1.6rem;
    }

    span {
      font-size: 1.5rem;
    }
  }
`

const CrossButton = styled.button`
  color: var(--black-primary);

  svg {
    stroke-width: 1.1;
  }

  ${({ disabled }) => {
    return disabled
      ? css`
          `
      : css`
          cursor: pointer;
          `
  }}
  
  .visually-hidden:not(:focus):not(:active) {
      clip: rect(0 0 0 0); 
      clip-path: inset(100%); 
      height: 1px; 
      overflow: hidden; 
      position: absolute; 
      white-space: nowrap; 
      width: 1px; 
    }
`

const CardStyle = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 45rem;
  margin: auto;
  background: var(--white);

  &.blur {
    filter: blur(2rem);
  }
`;

const PracticeCards = ({
  deckName,
  flashcardData,
  setMode,
  selectedCardIndices,
  isModalMode,
  loadedCards,
  current,
  setCardProperty,
  addLoadedCards,
  previousCard,
  nextCard,
}) => {

  // Default card before start 
  const setDefaultDeck = () => {
    const defaultCard = {
      id: "default",
      deckId: "default-deck",
      term: "",
      definition: "",
      createdAt: "",
      fillStar: false,
      isLearning: true
    }
    return [<Card
      card={defaultCard}
      key={defaultCard.id}
      showingModal={true}
      isEndCard={true}
      loadedCards={loadedCards}
    />];
  }

  // normal way of getting cards after start
  const setDeckFromIds = () => {
    // test if we have valid indices yet
    if (!flashcardData[selectedCardIndices[0]]) {
      return setDefaultDeck();
    }

    let cards = selectedCardIndices.map((id) => {
      let card = flashcardData[id];
      return <Card
        card={card}
        key={card.id}
        showingModal={isModalMode()}
        nextCard={nextCard}
        isEndCard={current === selectedCardIndices.length - 1}
        setCardProperty={setCardProperty}
        setMode={setMode}
        addLoadedCards={addLoadedCards}
        current={current}
      />;
    });
    return cards;
  }

  const cards = setDeckFromIds();
  const defaultCard = setDefaultDeck();

  return (
    <>
      <CardsHeaderStyle className={isModalMode() && 'blur'}>
        <div></div>
        <div>
          <h2>{deckName}</h2>
          {(selectedCardIndices && selectedCardIndices.length > 0) && (
            <span>
              {current + 1} / {selectedCardIndices.length}
            </span>
          )}
        </div>
        <CrossButton disabled={isModalMode()} onClick={() => setMode(modes.practice.warning)}>
          <RxCross2 size={25} />
          <span className="visually-hidden">Cancel Button</span>
        </CrossButton>
      </CardsHeaderStyle>
      <CardStyle className={isModalMode() && 'blur'}>
        <Arrow direction="left" disabled={current === 0} onClick={previousCard} alt="previous_button" />
        {selectedCardIndices && selectedCardIndices.length > 0 ? cards[current] : defaultCard[0]}
        <Arrow direction="right" disabled={current === selectedCardIndices.length - 1} onClick={nextCard} alt="next_button" />
      </CardStyle>
    </>
  );
};

export default PracticeCards;
