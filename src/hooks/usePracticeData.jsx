import { useState } from "react";
import { getDeckAndCardsDataById, postDeckAndOrderedCardsDataById } from "../helpers/deckAndCardsHelpers";
import { useAuth0 } from "@auth0/auth0-react";

const usePracticeData = () => {
  const [flashcardData, setFlashcardData] = useState({});
  const [deckData, setDeckData] = useState({});
  // const { getAccessTokenSilently, user } = useAuth0();

  const initializeDeckAndCardsDataById = async (id) => {
    // const accessToken = await getAccessTokenSilently();
    
    // if (user) {
    //   const { data, error } = await postDeckAndOrderedCardsDataById(accessToken, id);
    //   if (data) {
    //     setDeckData({ deckName: data.deck.deck_name, description: data.deck.description });
    //     const formattedCardData = formatFlashcardData(data.cards);
    //     setFlashcardData(formattedCardData);
    //   }
    //   if (error) {
    //     console.log(error);
    //   }
    // } else {
      const { data, error } = await getDeckAndCardsDataById(id);
      if (data) {
        setDeckData({ deckName: data.deck.deck_name, description: data.deck.description });
        const formattedCardData = formatFlashcardData(data.cards);
        setFlashcardData(formattedCardData);
      }
      if (error) {
        console.log(error);
      }
    // }
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