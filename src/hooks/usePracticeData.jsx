import { useState } from "react";
import { getDeckAndSortedCardsDataById } from "../helpers/deckAndCardsHelpers";

const usePracticeData = () => {
  const [flashcardData, setFlashcardData] = useState({});
  const [deckData, setDeckData] = useState({});
  const [sortedCardId, setSortedCardId] = useState([]);

  // console.log("flashcardData", flashcardData)
  

  const initializeDeckAndCardsDataById = async (accessToken, id) => {

      const { data, error } = await getDeckAndSortedCardsDataById(accessToken, id);
      if (data) {
        const ids = Object.keys(data.cards).map(el => data.cards[el].id);
        setSortedCardId(ids);
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
          fillStar: card.star,
          isLearning: card.learning
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
    sortedCardId,
    setCardProperty,
    initializeDeckAndCardsDataById
  };
}

export default usePracticeData