import { useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const useApplicationData = () => {

  const { id } = useParams();
  const [flashcarddata, setFlashcarddata] = useState({});
  const [deck, setDeck] = useState("");

  useEffect(() => {

    // Need to change to axios.all
    axios.get(`api/deck/${id}`)

      .then(res => {
        const deckById = res.data;
        setDeck(deckById);
      })
      .catch(err => {
        console.log(err)
      })

      axios.get(`api/card/deck/${id}`)
      .then(res => {
        const flashcardDataByDeckId = res.data;
        const formattedCardData = formatFlashcardData(flashcardDataByDeckId);
        setFlashcarddata(formattedCardData);
      })
      .catch(err => {
        console.log(err)
      })

  }, [id]);

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

  const setCardProperty = (cardId, property, value )  => {
    let card = {...flashcarddata[cardId]};
    card[property] = value
    let updateObj = {[cardId]: card};
    setFlashcarddata(prev => ({...prev, ...updateObj}));
  }

  return {
    deck,
    flashcarddata,
    setCardProperty,
  };
}

export default useApplicationData