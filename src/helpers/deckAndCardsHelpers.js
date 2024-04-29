import { endpoints } from "./endpoints";
import { callExternalApi } from "./callExternalApi";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

const getDeckContentsForInsertion = (newDeckContents) => {
  return {
    deckName: newDeckContents.deckName.toLowerCase(),
    description: newDeckContents.description
  }
};

const getCardsContentsForInsertion = (newCardContents) => newCardContents.map((card) => {
  return {
    term: card.term,
    definition: card.definition
  }
});

export const getAllDecks = async () => {
  const config = {
    url: `${apiServerUrl}${endpoints.GET_ALL_DECKS}`,
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  }

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
}

export const getDeckAndCardsDataById = async (id) => {
  const config = {
    url: `${apiServerUrl}${endpoints.GET_DECK_BY_ID(id)}`,
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  }

  const { data, error } = await callExternalApi({ config });

  return {
    data,
    error,
  };
}

export const postUpdateDeckAndCards = async (accessToken, updateDeckData, createdCardsData, updateCardsData, deleteCardsData, id) => {
  const appendParamToEndPoint = endpoints.UPDATE_DECK(id);

  const config = {
    url: `${apiServerUrl}${appendParamToEndPoint}`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      updateDeckData,
      createdCardsData,
      updateCardsData,
      deleteCardsData
    }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const postCreateDeckAndCards = async (accessToken, newDeckContents, newCardContents) => {
  const deckContentsForInsertion = getDeckContentsForInsertion(newDeckContents);
  const cardsContentsForInsertion = getCardsContentsForInsertion(newCardContents);
  const config = {
    url: `${apiServerUrl}${endpoints.CREATE_DECK}`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      newDeckContents: deckContentsForInsertion,
      newCardContents: cardsContentsForInsertion
    }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};
export const deleteDeckAndCards = async (accessToken, id) => {
  const appendParamToEndPoint = endpoints.DELETE_DECK_AND_CARDS_BY_ID(id);

  const config = {
    url: `${apiServerUrl}${appendParamToEndPoint}`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const updateStats = async (accessToken, stats) => {

  const config = {
    url: `${apiServerUrl}${endpoints.UPDATE_STAT}`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      stats
    }
  };
  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};
