import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import DeckSettings from './DeckSettings'
import { useParams } from 'react-router-dom'
import Card from "./Card";

const Cards = () => {
  const { id } = useParams();
  const [numCard, setNumCard] = useState(0);

  const [flashcarddata, setFlashcarddata] = useState([]);

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

  return (
    <>
    {numCard === 0 && <DeckSettings setNumCard={setNumCard} id={id}/>}
    <Wrapper>
      {/* number of cards */}
      {numCard > 0 && flashcarddata && flashcarddata.length > 0 ? (
        <div className="cardNumber">
          Card {current + 1} of {flashcarddata.length}
        </div>
      ) : (
        ""
      )}
      {/* /number of cards */}

      {/* render cards */}
      {flashcarddata && flashcarddata.length > 0 ? cards[current] : loading}
      {/* /render cards */}
      {/* render nav buttons */}
      <div className="nav">
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
      </div>
    </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 40rem;
  background: var(--quaternary-color);
  z-index: -1;
`

export default Cards