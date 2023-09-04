import { useState } from 'react'
import { getDeckAndCardsDataById } from '../helpers/deckAndCardsHelpers'

const usePracticeData = () => {
  // for quiz format
  const [flashcardData, setFlashcardData] = useState({});
  const [deckData, setDeckData] = useState({});

  const initializeDeckAndCardsDataById = async (id) => {
      const { deckName, description, flashcardData } = await getDeckAndCardsDataById(id);
      setDeckData({ deckName, description });
      const formattedCardData = formatFlashcardData(flashcardData);
      setFlashcardData(formattedCardData);
  }

  // PRACTICE:
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

  
  // PRACTICE:
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
    initializeDeckAndCardsDataById
  };
}

export default usePracticeData