import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const useApplicationData = () => {

  const { id } = useParams();
  const [flashcarddata, setFlashcarddata] = useState({});
  const [deckName, setDeckName] = useState("");

  useEffect(() => {
    axios.get(`api/card/deck/${id}`)
      .then(res => {
        const deckName = res.data.deckName;
        setDeckName(deckName);
        const flashcardDataByDeckId = res.data.cards;
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

  const setCardProperty = (cardId, property, value) => {
    let card = { ...flashcarddata[cardId] };
    card[property] = value
    let updateObj = { [cardId]: card };
    setFlashcarddata(prev => ({ ...prev, ...updateObj }));
  }

  return {
    deckName,
    flashcarddata,
    setCardProperty,
  };
}

export default useApplicationData