import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import DeckSettings from './DeckSettings'
import CardsHeader from './CardsHeader'
import Card from "./Card"
import Confimation from './Confimation'
import ResultHeader from './ResultHeader'
import Result from './Result'
import useApplicationData from '../hooks/useApplicationData'
import { modes } from '../helpers/modes'
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md'

const Cards = () => {
  const {
    deckName,
    flashcarddata,
    setCardProperty,
  } = useApplicationData();
  
  const [mode, setMode] = useState(modes.before);
  const [selectedCardIndices, setSelectedCardIndices] = useState([]);
  const [numCards, setNumCards] = useState();

  // navigation in cards
  const [current, setCurrent] = useState(0);
  const previousCard = () => {
    setCurrent(current - 1);
  }
  const nextCard = () => {
    setCurrent(current + 1);
  }

  const isModalMode = () => {
    if (mode === modes.before || mode === modes.finishConfirmation) {
      return true;
    }
  }

  const displayCards = () => {
    if (mode === modes.before || mode === modes.answering || mode === modes.finishConfirmation) {
      return true;
    }
  }

  useEffect(() => {
    const keys = Object.keys(flashcarddata).sort(() => Math.random() - 0.5).slice(0, numCards);
    setSelectedCardIndices(keys); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numCards]);
  
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
    showingModal={true}
    isEndCard={true}
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
      showingModal={isModalMode()}
      nextCard={nextCard}
      isEndCard={current === selectedCardIndices.length - 1}
      setCardProperty={setCardProperty}
      setMode={setMode}
      />;
    });
    return cards;
  }

  const setResults = () => {
    return selectedCardIndices.map((id) => {
      let stat = flashcarddata[id];
      return <Result
        term={stat.term}
        definition={stat.definition}
        isLearning={stat.isLearning}
        fillStar={stat.fillStar}
      />
    })
  }

  const getNumLeaning = () => {
    const numLearning = selectedCardIndices.filter(id => {
      let stat = flashcarddata[id];
      if (stat.isLearning === true) {
        return id;
      }
    })
    return numLearning.length;
  }

  const cards = setDeckFromIds();
  const defaultCard = setDefaultDeck();
  const results = setResults();
  const numLearning = getNumLeaning();

  return (
    <>
      {/* Before start  */}
      {mode === modes.before && 
        <DeckSettings
          setNumCards={setNumCards}
          deckName={deckName}
          setMode={setMode}
          totalCards={Object.keys(flashcarddata).length}
        />}
      {/* Before start */}

      {/* Finish Confirmation */}
      {mode === modes.finishConfirmation && 
        <Confimation
          setCurrent={setCurrent}
          current={current}
          setMode={setMode}
        />
      }
      {/* Finish Confirmation */}

      { displayCards() &&
      <CardsHeader
        isModalMode={isModalMode}
        selectedCardIndices={selectedCardIndices}
        deck_name={deckName}
        current={current}
        setMode={setMode}
      />
      }

      { displayCards() && 
      <CardStyle className={isModalMode() && 'blur'}>

        <Button disabled={isModalMode()}>
          {current > 0 ? <MdArrowBackIosNew onClick={previousCard} alt="previous_button"/>
          :
          <div className="emptyContent"></div>
          }
        </Button>

        {/* render cards */}
        {selectedCardIndices && selectedCardIndices.length > 0 ?  cards[current] : defaultCard[0]}
        {/* /render cards */}

        <Button disabled={isModalMode()}>
          {current < selectedCardIndices.length - 1 ? <MdArrowForwardIos onClick={nextCard} alt="next_button" />
          :
          <div className="emptyContent"></div>
          }
        </Button>

      </CardStyle>
      }
      {/* finished */}
      {mode === modes.finished && 
        <ResultHeader
        deckName={deckName}
        numCards={selectedCardIndices.length}
        numLearning={numLearning}
        />}
      {mode === modes.finished && results}
      

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

      ${({ disabled }) => {
      return disabled
        ? css`
        
        `
        : css`
        cursor: pointer;

        &:hover {
          background: var(--black-primary);
          opacity: .5;
          color: var(--white-primary);
        }

        &:active {
          background: var(--white-primary);
          color: var(--black-primary);
        }
      `
      }}
    }

    .emptyContent {
      width: 4.4rem;
      height: 4.4rem;
    }

`;

export default Cards