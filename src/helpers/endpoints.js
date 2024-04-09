const endpoints = {
  "UPDATE_DECK": (id) => `/api/deck/update/${id}`,
  "CREATE_DECK": "/api/deck/create",
  "GET_DECK_BY_ID": (id) => `/api/card/deck/${id}`,
}

export {endpoints};