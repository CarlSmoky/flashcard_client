import axios from 'axios'
import { endpoints } from './endpoints';

export const updateDeckAndCards = async (updateDeckData, createdCardsData, updateCardsData, deleteCardsData, setEditDeckResult, setError, id) => {
  const appendParamToEndPoint = endpoints.UPDATE_DECK(id);

  try {
    const response = await axios.post(appendParamToEndPoint, { updateDeckData, createdCardsData, updateCardsData, deleteCardsData});
    setEditDeckResult(response.data);
  } catch (error) {
    setError(error.response.data.error);
  }
};

export const createDeckAndCards = async (newDeckContents, newCardContents, setNewDeck, setError) => {
  const deckContentsForInsertion = getDeckContentsForInsertion(newDeckContents);
  const cardsContentsForInsertion = getCardsContentsForInsertion(newCardContents)
  try {
    const response = await axios.post(endpoints.NEWDECK, { newDeckContents: deckContentsForInsertion, newCardContents: cardsContentsForInsertion });
    setNewDeck(response.data)
  } catch (error) {
    setError(error.response.data.error);
    console.log(error.response.data.error);
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