import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from "axios";
import DeckItem from './DeckItem';

const Decks = () => {

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    
    axios.get(`api/deck/`)
    .then(res => {
      const allDecks = res.data;
      setDecks(allDecks);
    })
    .catch (err => {
      console.log(err)
    })
  }, []);
  
  const allDecks = decks.map(deck => {
    return (
      <DeckItem
        key={deck.id}
        id={deck.id}
        deckName={deck.deck_name}
        user_id={deck.user_id}
      />
    )
  });
    
  return (
    <Wrapper>
      {allDecks}
    </Wrapper>
  )
}

const Wrapper = styled.div`
`

export default Decks