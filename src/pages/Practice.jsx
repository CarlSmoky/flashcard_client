import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { modes } from "../helpers/modes";
import { confirmationMessage } from "../helpers/messages";
import usePracticeData from "../hooks/usePracticeData";
import PageLayout from "../components/PageLayout";
import ConfirmationWithYesAndCancel from "../components/ConfirmationWithYesAndCancel";
import NumOfCardsInput from "../components/NumOfCardsInput";
import PracticeCards from "../components/PracticeCards";
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
    sortedCardId,
    setCardProperty,
    initializeDeckAndCardsDataById
  } = usePracticeData();

  let navigate = useNavigate();
  const { id } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [mode, setMode] = useState(modes.practice.before);
  const [confirmationMsg, setConfirmationMsg] = useState({ header: "", text: "" });
  const [selectedCardIndices, setSelectedCardIndices] = useState([]);
  const [numCards, setNumCards] = useState([]);
  const [loadedCards, setLoadedCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [settingNumCards, setsettingNumCards] = useState(0);

  
  useEffect(() => {
    initializeData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  
  const initializeData = async () => {
    const accessToken = await getAccessTokenSilently();
      initializeDeckAndCardsDataById(accessToken, id)
  }

  useEffect(() => {
    const keys = sortedCardId.slice(0, numCards).sort(() => Math.random() - 0.5);
    setSelectedCardIndices(keys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numCards]);

  useEffect(() => {
    if(mode === modes.practice.before) {
      setsettingNumCards(Object.keys(flashcardData).length);
      setConfirmationMsg({
        header: confirmationMessage.practice.before.header(deckData.deckName),
        text : confirmationMessage.practice.before.text
      })

    }
  }, [flashcardData, deckData]);

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
    if (mode === modes.practice.before || mode === modes.practice.warning) {
      return true;
    }
  }

  const displayCards = () => {
    if (mode === modes.practice.before || mode === modes.practice.answering || mode === modes.practice.warning) {
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

  const startYesHandler = () => {
    setNumCards(settingNumCards);
    setMode(modes.practice.answering);
  }

  const startCancelHandler = () => {
    navigate('/decklist');
  }

  const finishYesHandler = () => {
    addLoadedCards(current);
    setMode(modes.practice.finished);
  }
  const finishCancelHandler = () => {
    setMode(modes.practice.answering);
  }

  return (
    <PageLayout>
      <Wrapper>
        {/* Before start  */}
        {mode === modes.practice.before &&
          <ConfirmationWithYesAndCancel header={confirmationMsg.header} text={confirmationMsg.text} handleYes={startYesHandler} handleCancel={startCancelHandler}>
            <NumOfCardsInput onChange={onChange} settingNumCards={settingNumCards} max={Object.keys(flashcardData).length} />
          </ConfirmationWithYesAndCancel>
        }
        {/* Before start */}

        {/* Answering cards */}
        {displayCards() &&
          <PracticeCards
            deckName={deckData.deckName}
            flashcardData={flashcardData}
            setMode={setMode}
            setConfirmationMsg={setConfirmationMsg}
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
        {mode === modes.practice.warning &&
          <ConfirmationWithYesAndCancel header={confirmationMsg.header} handleYes={finishYesHandler} handleCancel={finishCancelHandler}/>
        }
        {/* Finish Confirmation */}

        {/* finished */}
        {mode === modes.practice.finished &&
          <Result
            deckName={deckData.deckName}
            numCards={loadedCards.length}
            numLearning={numLearning}
            loadedCards={loadedCards}
            flashcarddata={flashcardData}
            setCardProperty={setCardProperty}
          />}
      </Wrapper>
    </PageLayout>
  )
}

export default Practice