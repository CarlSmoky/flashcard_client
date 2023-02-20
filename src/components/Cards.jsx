import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import DeckSettings from './DeckSettings'
import CardsHeader from './CardsHeader'
import Card from "./Card";
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md'

const Cards = () => {
  const { id } = useParams();
  const [start, setStart] = useState(false);
  const [flashcarddata, setFlashcarddata] = useState([]);
  const [selectedCardIndices, setSelectedCardIndices] = useState([]);
  const [numCards, setNumCards] = useState(0);
  const [deck, setDeck] = useState("");
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

    // Need to change to axios.all
    axios.get(`api/deck/${id}`)

      .then(res => {
        const deckById = res.data;
        setDeck(deckById);
      })
      .catch(err => {
        console.log(err)
      })

      axios.get(`api/card/deck/${id}`)
      .then(res => {
        const flashcardDataByDeckId = res.data;
        const formattedCardData = formatFlashcardData(flashcardDataByDeckId);
        setFlashcarddata(formattedCardData);
        console.log(formattedCardData);
      })
      .catch(err => {
        console.log(err)
      })

  }, [id]);

  const formatFlashcardData = (rawAPIData) => {
    const initialValue = {};
    return rawAPIData.reduce((obj, card) => {
      return {
        ...obj,
        [card.id]: {
          id: card.id,
          deckId: card.deck_id,
          term: card.term,
          definition: card.definition,
          createdAt: card.created_at,
          fillStar: false,
          isLearning: true
        }
      };
    }, initialValue);
  }

  const toggleFillStar = (cardId, value) => {
    // TODO: check if this works, maybe simplify to two lines
    // TODO: combine with setIsLearing by passing key as arg
    let card = {...flashcarddata[cardId]};
    card.fillStar = value
    let updateObj = {[cardId]: card};
    setFlashcarddata(prev => ({...prev, ...updateObj}));
  }

  const setIsLearning = (cardId, value) => {
    let card = {...flashcarddata[cardId]};
    card.isLearning = value
    let updateObj = {[cardId]: card};
    setFlashcarddata(prev => ({...prev, ...updateObj}));
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
              setIsLearning={setIsLearning}
              toggleFillStar={toggleFillStar}
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