import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from "axios";
import DeckItem from '../components/DeckItem';

const DeckList = () => {

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
        description={deck.description}
        user_id={deck.user_id}
      />
    )
  });
    
  return (
    <>
    <Wrapper>
      <Title>Deck List</Title>
      <Content>
      {allDecks}
      </Content>
    </Wrapper>
  </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 9.3rem - 9.3rem);

  @media (max-width: 768px) {
    min-height: calc(100vh - 6rem - 6rem);
  }
`
const Title = styled.h1`
  font-size: 2rem;
  text-align: left;
  margin: 2rem;
  padding: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem;
  padding: 1.3rem;
`


export default DeckList