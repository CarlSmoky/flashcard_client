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
  const [numCards, setNumCards] = useState(0);
  const [deck, setDeck] = useState("");
  const { deck_name } = deck;
  const [status, setStatus] = useState({});

  //update stats
  const updateStates = (isLearning, fillStar) => {
    const newObj = {
    id: flashcarddata[current].id,
    user_id: 1,
    deck_id: flashcarddata[current].deck_id,
    learning: isLearning,
    star: fillStar,
    }
    const key = flashcarddata[current].id;
    const updateObj = {[key]: newObj}
    setStatus(prev => ({...prev, ...updateObj}));
  }


  // navigation in cards
  const [current, setCurrent] = useState(0);
  const previousCard = () => {
    setCurrent(current - 1);
  }
  const nextCard = () => {
    setCurrent(current + 1);
  }

  const nextAndUpdate = () => {
    nextCard();
    updateStates(true, false)
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
      })
      .catch(err => {
        console.log(err)
      })

  }, [id]);

  const formatFlashcardData = (rawAPIData) => {
    return rawAPIData.map((card) => {
      return {
        id: card.id,
        deckId: card.deck_id,
        term: card.term,
        definition: card.definition,
        createdAt: card.created_at,
        fillStar: false,
        isLearning: true
      }
    })
  }

  const toggleFillStar = (cardId, value) => {
    // find the card with cardId
    let prevFlashCards = flashcarddata;
    prevFlashCards.forEach((card, i) => {
      if (card.id === cardId) {
        prevFlashCards[i].fillStar = value;
      }
    });
    setFlashcarddata(prevFlashCards);
  }


  useEffect(() => {
    const shuffleFlashCard = flashcarddata.sort(() => Math.random() - 0.5).slice(0, numCards);
    setFlashcarddata(shuffleFlashCard);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numCards, start])

  const cards = flashcarddata.map((card) => {
    return <Card
              card={card}
              key={card.id}
              showingModal={!start}
              nextCard={nextCard}
              isEndCard={current === flashcarddata.length - 1}
              updateStates={updateStates}
              status={status[card.id]}
              toggleFillStar={toggleFillStar}
            />;
  });

  useEffect(() => {
    console.log(status)
  }, [status])

  const loading = <div className="loading">Loading flashcard content...</div>;

  console.log(flashcarddata);
  return (
    <>
      {/* Before start */}
      {!start && <DeckSettings setNumCards={setNumCards} deckName={deck_name} setStart={setStart} totalCards={flashcarddata.length} />}

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
            <MdArrowForwardIos onClick={nextAndUpdate} alt="next_button" />
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