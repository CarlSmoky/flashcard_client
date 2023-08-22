import axios from 'axios'


const endpoints = {
  "UPDATE_DECK": (id) => `api/deck/update/${id}`
}


//move this function to helper
export const updateDeckAndCards = async (updateDeckData, createdCardsData, updateCardsData, deleteCardsData, setEditDeckResult, setError, id) => {
  const appendParamToEndPoint = endpoints.UPDATE_DECK(id);

  try {
    const response = await axios.post(appendParamToEndPoint, { updateDeckData, createdCardsData, updateCardsData, deleteCardsData});
    const resp = await response.data;
    setEditDeckResult(resp);
  } catch (error) {
    setError(error.response.data.error);
  }
};


