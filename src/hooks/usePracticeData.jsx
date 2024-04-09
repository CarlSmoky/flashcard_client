import { useState } from "react";
import { getDeckAndCardsDataById } from "../helpers/deckAndCardsHelpers";

const usePracticeData = () => {
  const [flashcardData, setFlashcardData] = useState({});
  const [deckData, setDeckData] = useState({});

  const initializeDeckAndCardsDataById = async (id) => {
    const { data, error } = await getDeckAndCardsDataById(id);
    if (data) {
      setDeckData({ deckName: data.deck.deck_name, description: data.deck.description });
      const formattedCardData = formatFlashcardData(data.cards);
      setFlashcardData(formattedCardData);
    }
    if (error) {
      console.log(error);
    }
  }

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
    initializeDeckAndCardsDataById
  };
}

export default usePracticeData