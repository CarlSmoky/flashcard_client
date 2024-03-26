import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import usePracticeData from "../hooks/usePracticeData";
import { modes } from "../helpers/modes";
import { truncate } from "../helpers/utilities";
import GenericConfirmation from "../components/GenericConfirmation";
import PracticeCards from "../components/PracticeCards";
import NumOfCardsInput from "../components/NumOfCardsInput";
import Button from "../components/Button";
import Result from "./Result";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 9.3rem - 9.3rem);

  @media (max-width: 768px) {
    min-height: calc(100vh - 6rem - 6rem);
  }
`

const Practice = () => {
  const {
    deckData,
    flashcardData,
    setCardProperty,
    initializeDeckAndCardsDataById
  } = usePracticeData();

  const { id } = useParams();
  let navigate = useNavigate();

  const [mode, setMode] = useState(modes.before);
  const [selectedCardIndices, setSelectedCardIndices] = useState([]);
  const [numCards, setNumCards] = useState([]);
  const [loadedCards, setLoadedCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [settingNumCards, setsettingNumCards] = useState(0);

  useEffect(() => {
    initializeDeckAndCardsDataById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const keys = Object.keys(flashcardData).sort(() => Math.random() - 0.5).slice(0, numCards);
    setSelectedCardIndices(keys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numCards]);

  useEffect(() => {
    setsettingNumCards(Object.keys(flashcardData).length);
  }, [flashcardData]);

  const addLoadedCards = (current) => {
    const currentCardId = selectedCardIndices[current];
    if (loadedCards.indexOf(currentCardId) === -1) {
      setLoadedCards([...loadedCards, currentCardId]);
    }
  }

  const previousCard = () => {
    setCurrent(current - 1);
    addLoadedCards(current);
  }
  const nextCard = () => {
    setCurrent(current + 1);
    addLoadedCards(current);
  }

  const isModalMode = () => {
    if (mode === modes.before || mode === modes.finishConfirmation) {
      return true;
    }
  }

  const displayCards = () => {
    if (mode === modes.before || mode === modes.answering || mode === modes.finishConfirmation) {
      return true;
    }
  }

  const getNumLeaning = () => {
    const numLearning = loadedCards.filter(id => {
      let stat = flashcardData[id];
      if (stat.isLearning === true) {
        return id;
      }
    })
    return numLearning.length;
  }

  const numLearning = getNumLeaning();

  const onChange = (e) => {
    setsettingNumCards(e.target.value)
  };

  const handleStart = () => {
    setNumCards(settingNumCards);
    setMode(modes.answering);
  }

  const handleQuit = () => {
    addLoadedCards(current);
    setMode(modes.finished);
  }
  const handleBackToDeck = () => {
    setMode(modes.answering);
  }

  return (
    <Wrapper>
      {/* Before start  */}
      {mode === modes.before &&
        <GenericConfirmation text={truncate(deckData.deckName, 18)} >
          <NumOfCardsInput onChange={onChange} settingNumCards={settingNumCards} max={Object.keys(flashcardData).length} />
          <Button
            text="Start"
            buttonType='button'
            onButtonClick={handleStart}
          />
          <Button
            text="Cancel"
            buttonType='button'
            onButtonClick={() => navigate('/decklist')}
          />
        </GenericConfirmation>
      }
      {/* Before start */}

      {/* Answering cards */}
      {displayCards() &&
        <PracticeCards
          deckName={deckData.deckName}
          flashcardData={flashcardData}
          setMode={setMode}
          selectedCardIndices={selectedCardIndices}
          isModalMode={isModalMode}
          current={current}
          loadedCards={loadedCards}
          setCardProperty={setCardProperty}
          addLoadedCards={addLoadedCards}
          previousCard={previousCard}
          nextCard={nextCard}
        />
      }
      {/* Answering cards */}

      {/* Finish Confirmation */}
      {mode === modes.finishConfirmation &&
        <GenericConfirmation text="Do you want to finish?">
          <Button
            text="Done"
            buttonType="button"
            onButtonClick={handleQuit}
          />
          <Button
            text="Back to Deck"
            buttonType="button"
            onButtonClick={handleBackToDeck}
          />
        </GenericConfirmation>
      }
      {/* Finish Confirmation */}

      {/* finished */}
      {mode === modes.finished &&
        <Result
          deckName={deckData.deckName}
          numCards={loadedCards.length}
          numLearning={numLearning}
          loadedCards={loadedCards}
          flashcarddata={flashcardData}
          setCardProperty={setCardProperty}
        />}
    </Wrapper>
  )
}

export default Practice