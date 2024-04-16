const endpoints = {
  "UPDATE_DECK": (id) => `/api/deck/update/${id}`,
  "CREATE_DECK": "/api/deck/create",
  "GET_DECK_BY_ID": (id) => `/api/card/deck/${id}`,
  "DELETE_DECK_AND_CARDS_BY_ID": (id) => `/api/deck/delete/${id}`,
  "UPDATE_STAT": "/api/stat"
}

export {endpoints};