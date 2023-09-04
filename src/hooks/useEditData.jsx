import { useState } from 'react'
// import { useParams } from 'react-router-dom'
import { getDeckAndCardsDataById } from '../helpers/deckAndCardsHelpers'
import { defaultEditableDeck, defaultEditableCard, updateStatus } from '../helpers/defaultEditableData'

const useEditData = () => {
  const [editableDeck, setEditableDeck] = useState({ ...defaultEditableDeck });
  const [editableCards, setEditableCards] = useState([{ ...defaultEditableCard }]);

  const currentDeck = {
    deckContents: editableDeck,
    cardContents: editableCards,
    setDeckContents: setEditableDeck,
    setCardContents: setEditableCards,
  }
  
  const initializeEditableDeckAndCardsById = async (id) => {
    const { deckName, description, flashcardData } = await getDeckAndCardsDataById(id);

    const formattedEditableDeck = formatEditableDeck(id, deckName, description)
      setEditableDeck(formattedEditableDeck);

      // make editableCards
      const formattedEditableCards = formatEditableCards(flashcardData)
      setEditableCards(formattedEditableCards)
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

  const createNewCard = () => {
    setEditableCards(prev => ([...prev, { ...defaultEditableCard }]));
  };

  const editCardContents = (index, cardContents) => {
    const prev = [...editableCards];
    prev[index] = cardContents;
    setEditableCards([...prev]);
  };


  return {
    createNewCard,
    editCardContents,
    initializeEditableDeckAndCardsById,
    editableDeck,
    setEditableDeck,
    editableCards,
    currentDeck
  }
}

export default useEditData