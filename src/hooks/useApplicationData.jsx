import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { defaultEditableDeck, defaultEditableCard, updateStatus } from '../helpers/defaultEditableData'
import { useModal } from '../providers/ModalProvider'

const useApplicationData = () => {
  const [error, setError] = useState('');
  const { id } = useParams();
  // for quiz format
  const [flashcardData, setFlashcardData] = useState({});
  const [deckData, setDeckData] = useState({});
  
  // for edit/create format
  const [editableDeck, setEditableDeck] = useState({ ...defaultEditableDeck });
  const [editableCards, setEditableCards] = useState([{ ...defaultEditableCard }]);

  const { modalActivated } = useModal();
  

  //move this function to helper
  const getDeckAndCardsData = async () => {
    try {
      const response = await axios.get(`api/card/deck/${id}`);
      const deckName = response.data.deck.deck_name;
      const description = response.data.deck.description;
      setDeckData({ deckName, description });
      const flashcardDataByDeckId = response.data.cards;

      const formattedCardData = formatFlashcardData(flashcardDataByDeckId);
      setFlashcardData(formattedCardData);


      // make editableDeck 
      const formattedEditableDeck = formatEditableDeck(id, deckName, description)
      setEditableDeck(formattedEditableDeck);

      // make editableCards
      const formattedEditableCards = formatEditableCards(flashcardDataByDeckId)
      setEditableCards(formattedEditableCards)
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  useEffect(() => {
    getDeckAndCardsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, modalActivated]);

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

  const formatEditableDeck = (id, deckName, description) => {
    return {
      id,
      deckName,
      description,
      errors: {
        deckName: '',
        description: '',
      },
      modifications: {
        deckName: true,
        description: true, 
      },
      updateStatus: updateStatus.default,
    }
  }

  const formatEditableCards = (flashcardDataByDeckId) => {
    return flashcardDataByDeckId.map(card => {
      return {
        id: card.id,
        term: card.term,
        definition: card.definition,
        errors: {
          term: '',
          definition: '',
        },
        modifications: {
          term: true,
          definition: true,
        },
        updateStatus: updateStatus.default
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
    editableDeck,
    editableCards,
    setEditableDeck,
    setEditableCards,
    error,
    setError
  };
}

export default useApplicationData