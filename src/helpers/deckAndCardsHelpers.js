import axios from "axios";
import { endpoints } from "./endpoints";
import { errorMessage } from "../helpers/messages";
import { callExternalApi } from "./callExternalApi";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

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

export const postCreateDeckAndCards = async (accessToken, newDeckContents, newCardContents) => {
  const deckContentsForInsertion = getDeckContentsForInsertion(newDeckContents);
  const cardsContentsForInsertion = getCardsContentsForInsertion(newCardContents);
  const config = {
    url: `${apiServerUrl}/api/deck/create`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data : {
      newDeckContents: deckContentsForInsertion,
      newCardContents: cardsContentsForInsertion }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};