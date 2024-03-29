import axios from 'axios'
import { endpoints } from './endpoints'
import { errorMessage } from '../helpers/messages'

export const getDeckAndCardsDataById = async (id) => {
  try {
    const response = await axios.get(endpoints.GET_DECK_BY_ID(id));
    return {
      deckName: response.data.deck.deck_name,
      description: response.data.deck.description,
      flashcardData: response.data.cards
    }
  } catch (error) {
    console.log(error.response.data.error);
  }
}

export const updateDeckAndCards = async (updateDeckData, createdCardsData, updateCardsData, deleteCardsData, id) => {
  const appendParamToEndPoint = endpoints.UPDATE_DECK(id);

  try {
    const response = await axios.post(appendParamToEndPoint, { updateDeckData, createdCardsData, updateCardsData, deleteCardsData});
    return {isUpdated: true,
      data: response.data
    };
  } catch (error) {
    console.log(error.response.data.error);
    return {isUpdated: false,
      error: errorMessage.titleExists
    };
  }
};

export const createDeckAndCards = async (newDeckContents, newCardContents) => {
  const deckContentsForInsertion = getDeckContentsForInsertion(newDeckContents);
  const cardsContentsForInsertion = getCardsContentsForInsertion(newCardContents)
  try {
    const response = await axios.post(endpoints.CREATE_DECK, { newDeckContents: deckContentsForInsertion, newCardContents: cardsContentsForInsertion });
    return {isUpdated: true,
      data: response.data
    };
  } catch (error) {
    console.log(error.response.data.error);
    return {isUpdated: false,
      error: errorMessage.titleExists
    };
  }
};

const getDeckContentsForInsertion = (newDeckContents) => {
  return {
    deckName: newDeckContents.deckName,
    description: newDeckContents.description
  }
};

const getCardsContentsForInsertion = (newCardContents) => newCardContents.map((card) => {
    return {
      term: card.term,
      definition: card.definition
    }
});