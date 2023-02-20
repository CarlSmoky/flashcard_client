import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DeckSettings from './DeckSettings'
import CardsHeader from './CardsHeader'
import Card from "./Card";
import useApplicationData from '../hooks/useApplicationData';
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md'

const Cards = () => {
  const {
    deck,
    flashcarddata,
    setCardProperty
  } = useApplicationData();
  
  const [start, setStart] = useState(false);
  const [selectedCardIndices, setSelectedCardIndices] = useState([]);
  const [numCards, setNumCards] = useState(0);
  const { deck_name } = deck;

  // navigation in cards
  const [current, setCurrent] = useState(0);
  const previousCard = () => {
    setCurrent(current - 1);
  }
  const nextCard = () => {
    setCurrent(current + 1);
  }

  useEffect(() => {
    const keys = Object.keys(flashcarddata).sort(() => Math.random() - 0.5).slice(0, numCards);
    setSelectedCardIndices(keys);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numCards, start])

  const cards = selectedCardIndices.map((id) => {
    let card = flashcarddata[id];
    
    return <Card
              card={card}
              key={card.id}
              showingModal={!start}
              nextCard={nextCard}
              isEndCard={current === selectedCardIndices.length - 1}
              setCardProperty={setCardProperty}
            />;
  });

  const loading = <div className="loading">Loading flashcard content...</div>;

  console.log(selectedCardIndices);
  return (
    <>
      {/* Before start */}
      {!start && <DeckSettings setNumCards={setNumCards} deckName={deck_name} setStart={setStart} totalCards={Object.keys(flashcarddata).length} />}

      <CardsHeader
        className={`${!start && 'blur'}`}
        selectedCardIndices={selectedCardIndices}
        deck_name={deck_name}
        current={current}
      />


      <CardStyle className={`${!start && 'blur'}`}>

        <Button disabled={!start}>
          {current > 0 ? (
            <MdArrowBackIosNew onClick={previousCard} alt="previous_button"/>
          ) : (
            <MdArrowBackIosNew className='disabled' alt="previous_button" disabled />
          )}
        </Button>

        {/* render cards */}
        {selectedCardIndices && selectedCardIndices.length > 0 ? cards[current] : loading}
        {/* /render cards */}

        <Button disabled={!start}>
          {current < selectedCardIndices.length - 1 ? (
            <MdArrowForwardIos onClick={nextCard} alt="next_button" />
          ) : (
            <MdArrowForwardIos className='disabled' alt="next_button" disabled />
          )}
        </Button>

      </CardStyle>

    </>
  )
}

const CardStyle = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 45rem;

  background: var(--white);
  z-index: -1;

  &.blur {
    filter: blur(2rem);
  }
`;

const Button = styled.button`
  margin: auto;
  
    svg {
      font-size: 4rem;
      padding: .2rem;
      border-radius: 50%;
      transition: all .3s;

      &:hover {
      background: var(--grey-primary);
      opacity: 0.6;
      color: white;
    }
    }

    .disabled {
      color: transparent;
      
      &:hover {
      background: transparent;
      }
    }

    
`;

export default Cards