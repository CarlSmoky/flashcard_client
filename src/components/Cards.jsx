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
  const [numCard, setNumCard] = useState(0);

  const [deck, setDeck] = useState("");

  const { deck_name } = deck;


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
  }, []);

  const cards = flashcarddata.map((card) => {
    return <Card card={card} key={card.id} showingModal={!start} />;
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
      {!start && <DeckSettings setNumCard={setNumCard} deckName={deck_name} setStart={setStart} totalCards={flashcarddata.length} />}

      <CardsHeader
        className={`${!start && 'blur'}`}
        flashcarddata={flashcarddata}
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
        {flashcarddata && flashcarddata.length > 0 ? cards[current] : loading}
        {/* /render cards */}

        <Button disabled={!start}>
          {current < flashcarddata.length - 1 ? (
            <MdArrowForwardIos onClick={nextCard} alt="next_button"/>
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