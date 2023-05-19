import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { defaultEditableDeck, defaultEditableCard } from '../helpers/defaultEditableData'

const useApplicationData = () => {

  const { id } = useParams();
  const [flashcardData, setFlashcardData] = useState({});
  const [deckData, setDeckData] = useState({});

  const [editableDeck, setEditableDeck] = useState({ ...defaultEditableDeck });
  const [editableCards, setEditableCards] = useState([{ ...defaultEditableCard }]);

  //move this function to helper
  const getDeckAndCardsData = async () => {
    try {
      const response = await axios.get(`api/card/deck/${id}`);
      const deckName = response.data.deck.deck_name;
      const description = response.data.deck.description;
      setDeckData({deckName, description});
      const flashcardDataByDeckId = response.data.cards;
      console.log(flashcardDataByDeckId);

      const formattedCardData = formatFlashcardData(flashcardDataByDeckId);
      setFlashcardData(formattedCardData);


      // make editableDeck 
      const formattedEditableDeck = formatEditableDeck(deckName, description)
      setEditableDeck(formattedEditableDeck);

      // make editableCards
      const formattedEditableCards = formatEditableCards(flashcardDataByDeckId)
      setEditableCards(formattedEditableCards)
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  console.log(editableDeck);
  console.log(editableCards);

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

  const formatEditableDeck = (deckName, description) => {
    return {
      deckName,
      description,
      errors: {
        deckName: '',
        description: '',
      },
      modifications: {
        deckName: true,
        description: true, 
      }
    }
  }

  const formatEditableCards = (flashcardDataByDeckId) => {
    return flashcardDataByDeckId.map(card => {
      return {
        term: card.term,
        definition: card.definition,
        errors: {
          term: '',
          definition: '',
        },
        modifications: {
          term: true,
          definition: true,
        }
      };
    })
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