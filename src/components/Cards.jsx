import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import DeckSettings from './DeckSettings'
import { useParams } from 'react-router-dom'
import Card from "./Card";

const Cards = () => {
  const { id } = useParams();
  const [numCard, setNumCard] = useState(0);

  const [deck, setDeck] = useState("");
  const {deck_name} = deck;

  const [flashcarddata, setFlashcarddata] = useState([]);

  useEffect(() => {
    axios.get(`api/deck/${id}`)
    .then(res => {
      const deckById = res.data;
      setDeck(deckById);
    })
    .catch (err => {
      console.log(err)
    })
  }, []);

  useEffect(() => {
    axios.get(`api/card/deck/${id}`)
    .then(res => {
      const flashcardDataByDeckId = res.data;
      setFlashcarddata(flashcardDataByDeckId);
    })
    .catch (err => {
      console.log(err)
    })
  }, [numCard]);

  const cards = flashcarddata.map((card) => {
    return <Card card={card} key={card.id} />;
  });

  const loading = <div className="loading">Loading flashcard content...</div>;

  // navigation in cards
  const [current, setCurrent] = useState(0);
  function previousCard() {
    setCurrent(current - 1);
  }
  function nextCard() {
    setCurrent(current + 1);
  }
  
  return (
    <>
    {numCard === 0 && <DeckSettings setNumCard={setNumCard} deckName={deck_name} id={id}/>}
    <Wrapper>
      {/* number of cards */}
      {flashcarddata && flashcarddata.length > 0 ? (
        <>
        <Header>{deck_name}</Header>
        <CardCount>
          {current + 1} / {flashcarddata.length}
        </CardCount>
        </>
      ) : (
        ""
      )}
      {/* /number of cards */}

      {/* render cards */}
      {flashcarddata && flashcarddata.length > 0 ? cards[current] : loading}
      {/* /render cards */}
      {/* render nav buttons */}
      <ButtonWrapper>
        {current > 0 ? (
          <button onClick={previousCard}>Previous card</button>
        ) : (
          <button className="disabled" disabled>
            Previous card
          </button>
        )}
        {current < flashcarddata.length - 1 ? (
          <button onClick={nextCard}>Next card</button>
        ) : (
          <button className="disabled" disabled>
            Next card
          </button>
        )}
        {/* /render nav buttons */}
      </ButtonWrapper>
    </Wrapper>
    </>
  )
}

const Wrapper  = styled.div`
  width: 100%;
  height: 50rem;
  background: var(--white);
  z-index: -1;
`

const Header = styled.h4`
  font-size: 2rem;
  text-align: left;
  padding: 3rem 0 0 1rem;
`

const CardCount = styled.h4`
  font-size: 1.5rem;
  padding-top: 1rem;
`
const ButtonWrapper = styled.div`
  margin: 2rem 0;

  button {
    margin: 1rem;
    width: 38%;
    height: 3rem;
  }
`

export default Cards