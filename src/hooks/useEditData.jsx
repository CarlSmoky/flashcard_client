import { useState } from "react";
import { getDeckAndCardsDataById } from "../helpers/deckAndCardsHelpers";
import { defaultEditableDeck, defaultEditableCard, updateStatus } from "../helpers/defaultEditableData";

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
    const { data, error } = await getDeckAndCardsDataById(id);
    if (data) {
      const formattedEditableDeck = formatEditableDeck(id, data.deck.deck_name, data.deck.description)
        setEditableDeck(formattedEditableDeck);
  
        // make editableCards
        const formattedEditableCards = formatEditableCards(data.cards)
        setEditableCards(formattedEditableCards)
    }
    if (error) {

    }
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
    setEditableCards(prev => ([{ ...defaultEditableCard }, ...prev]));
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