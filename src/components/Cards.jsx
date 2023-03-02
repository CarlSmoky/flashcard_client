import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DeckSettings from './DeckSettings'
import CardsHeader from './CardsHeader'
import Card from "./Card"
import Confimation from './Confimation'
import useApplicationData from '../hooks/useApplicationData';
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md'

const Cards = () => {
  const {
    deck,
    flashcarddata,
    setCardProperty,
  } = useApplicationData();
  
  const [start, setStart] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [selectedCardIndices, setSelectedCardIndices] = useState([]);
  const [numCards, setNumCards] = useState();
  const { deck_name } = deck;

  // navigation in cards
  const [current, setCurrent] = useState(0);
  const previousCard = () => {
    setCurrent(current - 1);
  }
  const nextCard = () => {
    setCurrent(current + 1);
  }

  const setClassNameBlur = () => {
    if (!start || confirmation) {
      return 'blur';
    }
  }

  useEffect(() => {
    const keys = Object.keys(flashcarddata).sort(() => Math.random() - 0.5).slice(0, numCards);
    setSelectedCardIndices(keys); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numCards, start]);
  
  // Default card before start 
  // TODO: move to another file?
  const setDefaultDeck = () => {
    const defaultCard = {
      id: "default",
      deckId: "default-deck",
      term: "marimo",
      definition: "kawaii",
      createdAt: "today",
      fillStar: false,
      isLearning: true
    }
    return [ <Card
    card={defaultCard}
    key={defaultCard.id}
    showingModal={!start}
    nextCard={nextCard}
    isEndCard={true}
    setCardProperty={setCardProperty}
    />];
  }
  
  // normal way of getting cards after start
  const setDeckFromIds = () => {
    // test if we have valid indices yet
    if (!flashcarddata[selectedCardIndices[0]]) {
      return setDefaultDeck();
    }

    let cards = selectedCardIndices.map((id) => {
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
    return cards;
  }

  const cards = setDeckFromIds();
  const defaultCard = setDefaultDeck();

  return (
    <>
      {/* Before start */}
      {!start && <DeckSettings setNumCards={setNumCards} deckName={deck_name} setStart={setStart} totalCards={Object.keys(flashcarddata).length} />}

      {confirmation && 
        <Confimation
          setComplete={setComplete}
          setCurrent={setCurrent}
          current={current}
          setConfirmation={setConfirmation}
        />
      }

      {complete && <h1>hi</h1>}

      <CardsHeader
        className={`${setClassNameBlur()}`}
        selectedCardIndices={selectedCardIndices}
        deck_name={deck_name}
        current={current}
        setConfirmation={setConfirmation}
      />


      <CardStyle className={`${setClassNameBlur()}`}>

        <Button disabled={!start}>
          {current > 0 ? (
            <MdArrowBackIosNew onClick={previousCard} alt="previous_button"/>
          ) : (
            <MdArrowBackIosNew className='disabled' alt="previous_button" disabled />
          )}
        </Button>

        {/* render cards */}
        {selectedCardIndices && selectedCardIndices.length > 0 ?  cards[current] : defaultCard[0]}
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
      background: var(--black-primary);
      opacity: 0.4;
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