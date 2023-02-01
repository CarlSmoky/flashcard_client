import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import DeckSettings from './DeckSettings'
import { useParams } from 'react-router-dom'

const Card = () => {
  const { id } = useParams();
  const [numCard, setNumCard] = useState(0);

  const [cards, setCards] = useState([]);
  

  useEffect(() => {
    axios.get(`api/card/deck/${id}`)
    .then(res => {
      const allCardsById = res.data;
      setCards(allCardsById);
    })
    .catch (err => {
      console.log(err)
    })
  }, [numCard]);


  
  // const allDecks = decks.map(deck => {
  //   return (
  //     <DeckItem
  //       key={deck.id}
  //       id={deck.id}
  //       deckName={deck.deck_name}
  //       user_id={deck.user_id}
  //     />
  //   )
  // });

  return (
    <>
    {numCard === 0 && <DeckSettings setNumCard={setNumCard} id={id}/>}
    <StyledCard>
      Card
    </StyledCard>
    </>
  )
}

const StyledCard = styled.div`
  width: 100%;
  height: 40rem;
  background: var(--quaternary-color);
  z-index: -1;
`

export default Card