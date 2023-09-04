import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { defaultEditableDeck, defaultEditableCard, updateStatus } from '../helpers/defaultEditableData'
import {  getDeckAndCardsDataById } from '../helpers/deckAndCardsHelpers'

const useApplicationData = () => {
  const { id } = useParams();
  // for quiz format
  const [flashcardData, setFlashcardData] = useState({});
  const [deckData, setDeckData] = useState({});

  const getDeckAndCardsData = async () => {
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
    getDeckAndCardsData
  };
}

export default useApplicationData