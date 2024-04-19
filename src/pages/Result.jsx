import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useModal } from "../providers/ModalProvider";
import { updateStats } from "../helpers/deckAndCardsHelpers";
import { modes } from "../helpers/modes";
import { confirmationMessage } from "../helpers/messages";
import ResultHeader from "../components/ResultHeader";
import ResultItem from "../components/ResultItem";
import ConfirmationWithOk from "../components/ConfirmationWithOk";
import ConfirmationWithYesAndCancel from "../components/ConfirmationWithYesAndCancel";
import Process from "../components/Process";
import Button from "../components/Button"

const Wrapper = styled.div`
  min-height: calc(100vh - 9.3rem - 9.3rem);

  &.blur {
    filter: blur(.6rem);
  }

  @media (max-width: 768px) {
    min-height: calc(100vh - 6rem - 6rem);
  }
`

const Result = ({
  deckName,
  numCards,
  numLearning,
  loadedCards,
  flashcarddata,
  setCardProperty
}) => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { getAccessTokenSilently, user } = useAuth0();
  const { modalActivated, openModal, closeModal } = useModal();
  const [mode, setMode] = useState(modes.stat.before);
  const [confirmationMsg, setConfirmationMsg] = useState({ header: "", text: "" });

  const handleSaveClick = async () => {
    const accessToken = await getAccessTokenSilently();
    if (!accessToken || !user.sub) {
      throw new Error(`You are not login.`);
    }

    openModal()
    setMode(modes.stat.warning);
    setConfirmationMsg({
      header: confirmationMessage.stat.warning.header,
    })
  }
  
  const saveStats = async () => {
    const accessToken = await getAccessTokenSilently();

    const stats = loadedCards.map((id) => {
      let stat = flashcarddata[id];
      return {
        cardId: stat.id,
        isLearning: stat.isLearning,
        star: stat.fillStar
      }
    })

    const { data, error } = await updateStats(accessToken, stats);

    if (data) {
      setMode(modes.stat.updated);
      setConfirmationMsg({
        header: confirmationMessage.stat.updated.header,
        text: confirmationMessage.stat.updated.text(data.numOfItem)
      })
    }
    if (error) {
      setMode(modes.stat.error)
      setConfirmationMsg({
        header: confirmationMessage.stat.error.header,
        text: confirmationMessage.stat.error.text
      })
    }
  }

  const setResults = () => {
    return loadedCards.map((id) => {
      let stat = flashcarddata[id];
      return <ResultItem
        key={id}
        term={stat.term}
        definition={stat.definition}
        isLearning={stat.isLearning}
        fillStar={stat.fillStar}
        setCardProperty={setCardProperty}
        cardId={id}
      />
    })
  }

  const statSaveYesHandler = () => {
    openModal();
    setMode(modes.stat.process);
    setConfirmationMsg({
      header: confirmationMessage.stat.process.header,
      text: confirmationMessage.stat.process.text
    })
    saveStats();
  }

  const statSaveCancelhandler = () => {
    setMode(modes.delete.before);
    const path = `/deck/${id}`;
    navigate(path);
    closeModal();
  }

  const handleOk = () => {
    setMode(modes.edit.before)
    const path = mode === modes.stat.updated ? `/decklist/` : `/deck/${id}`;
    navigate(path);
    closeModal();
  }

  const resultItems = setResults();

  return (
    <>
     {mode === modes.stat.warning &&
        <ConfirmationWithYesAndCancel header={confirmationMsg.header} handleYes={statSaveYesHandler} handleCancel={statSaveCancelhandler}/>
      }
      {mode === modes.stat.process && <Process header={confirmationMsg.header} />}
      {(mode === modes.stat.updated || mode === modes.stat.error) &&
        <ConfirmationWithOk header={confirmationMsg.header} text={confirmationMsg.text} handleOk={handleOk} />
      }
      <Wrapper className={modalActivated ? 'blur' : null}>
        <ResultHeader
          deckName={deckName}
          numCards={numCards}
          numLearning={numLearning}
        />
        {resultItems}
        {user?.sub && <Button text="save" onButtonClick={handleSaveClick} disabled={modalActivated}/>}
      </Wrapper>
    </>
  )
}

export default Result