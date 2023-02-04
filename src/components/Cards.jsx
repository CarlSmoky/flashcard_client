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
  const [numCard, setNumCard] = useState(0);

  const [deck, setDeck] = useState("");

  const { deck_name } = deck;

  const [flashcarddata, setFlashcarddata] = useState([]);

  useEffect(() => {
    axios.get(`api/deck/${id}`)

      .then(res => {
        const deckById = res.data;
        setDeck(deckById);
      })
      .catch(err => {
        console.log(err)
      })

  }, []);

  useEffect(() => {
    axios.get(`api/card/deck/${id}`)
      .then(res => {
        const flashcardDataByDeckId = res.data;
        setFlashcarddata(flashcardDataByDeckId);
      })
      .catch(err => {
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
      {/* Before start */}
      {numCard === 0 && <DeckSettings setNumCard={setNumCard} deckName={deck_name} id={id} />}

      <CardsHeader
        flashcarddata={flashcarddata} deck_name={deck_name}
        current={current}
      />

      <CardStyle>
        <Button>

        {current > 0 ? (
          <MdArrowBackIosNew onClick={previousCard} />
        ) : (
          <MdArrowBackIosNew className='disabled' disabled />
        )}
        </Button>

        {/* render cards */}
        {flashcarddata && flashcarddata.length > 0 ? cards[current] : loading}
        {/* /render cards */}
        
        <Button>
        {current < flashcarddata.length - 1 ? (
          <MdArrowForwardIos onClick={nextCard} />
        ) : (
          <MdArrowForwardIos className='disabled' disabled />
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
  height: 40rem;

  background: var(--white);
  z-index: -1;
`

const Button = styled.div`
margin: auto;
  svg {
    font-size: 4rem;
  }

  .disabled {
    color: red;
  }
`

export default Cards