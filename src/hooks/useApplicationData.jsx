import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const useApplicationData = () => {

  const { id } = useParams();
  const [flashcardData, setFlashcardData] = useState({});
  const [deckData, setDeckData] = useState({});

  const getDeckAndCardsData = async () => {
    try {
      const response = await axios.get(`api/card/deck/${id}`);
      const deckName = response.data.deck.deck_name;
        const description = response.data.deck.description;
        setDeckData({deckName, description});
        const flashcardDataByDeckId = response.data.cards;
        const formattedCardData = formatFlashcardData(flashcardDataByDeckId);
        setFlashcardData(formattedCardData);

    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  useEffect(() => {
    getDeckAndCardsData();
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

  const setCardProperty = (cardId, property, value) => {
    let card = { ...flashcardData[cardId] };
    card[property] = value
    let updateObj = { [cardId]: card };
    setFlashcardData(prev => ({ ...prev, ...updateObj }));
  }

  return {
    deckData,
    flashcardData,
    setCardProperty,
  };
}

export default useApplicationData