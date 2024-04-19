import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useModal } from "../providers/ModalProvider";
import { modes } from "../helpers/modes";
import { confirmationMessage } from "../helpers/messages";
import { deleteDeckAndCards } from "../helpers/deckAndCardsHelpers";
import PageLayout from "../components/PageLayout";
import DeckItem from "../components/DeckItem";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmationWithOk from "../components/ConfirmationWithOk";
import Process from "../components/Process";
import ConfirmationWithYesAndCancel from "../components/ConfirmationWithYesAndCancel";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 9.3rem - 9.3rem);

  &.blur {
    filter: blur(.6rem);
  }

  @media (max-width: 768px) {
    min-height: calc(100vh - 6rem - 6rem);
  }
`
const Title = styled.h1`
  font-size: 1.8rem;
  text-align: left;
  margin: 2rem 0;
  padding: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin: 1rem;
    padding: .8rem;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem;
  padding: 1.3rem;
`

const DeckList = () => {
  let navigate = useNavigate();
  const { user, getAccessTokenSilently } = useAuth0();
  const { modalActivated, openModal, closeModal } = useModal();
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(modes.delete.before);
  const [confirmationMsg, setConfirmationMsg] = useState({header: "",text: ""});
  const [deleteDeckId, setDeleteDeckId] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get(`api/deck/`)
      .then(res => {
        const allDecks = res.data;
        setDecks(allDecks);
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [mode]);

  const deleteYesHandler = () => {
    openModal();
    setMode(modes.delete.process);
    deleteDeck(deleteDeckId);
  }

  const deleteCancelhandler = () => {
    setMode(modes.delete.before);
    const path = `/decklist`;
    navigate(path);
    closeModal();
  }

  const okHandler = () => {
    navigate(0);
    setMode(modes.delete.before);
    const path = "/decklist";
    navigate(path);
    closeModal();
  }

  const deleteDeck = async (id) => {
    const accessToken = await getAccessTokenSilently();
    if (userId !== user.sub) {
      setMode(modes.delete.error);
      throw new Error(`You are not allowed to delete this deck and cards.`);
    }
    const { data, error } = await deleteDeckAndCards(accessToken, id);
    
    if (data) {
      setMode(modes.delete.updated);
      setConfirmationMsg({
        header: confirmationMessage.delete.updated.header,
        text: confirmationMessage.delete.updated.text
      })
    }
    if (error) {
      setMode(modes.delete.error);
      setConfirmationMsg({
        header: confirmationMessage.delete.error.header,
        text: confirmationMessage.delete.error.text
      })
    }
  }

  const allDecks = decks.map(deck => {
    return (
      <DeckItem
        key={deck.id}
        id={deck.id}
        deckName={deck.deck_name}
        description={deck.description}
        user_id={deck.user_id}
        setMode={setMode}
        setConfirmationMsg={setConfirmationMsg}
        setDeleteDeckId={setDeleteDeckId}
        setUserId={setUserId}
      />
    )
  });

  return (
    <PageLayout>
      {mode === modes.delete.warning &&
        <ConfirmationWithYesAndCancel header={confirmationMsg.header} text={confirmationMsg.text} handleYes={deleteYesHandler} handleCancel={deleteCancelhandler}/>
      }
      {mode === modes.delete.process && <Process header={confirmationMsg.header}/>}
      {(mode === modes.delete.updated || mode === modes.delete.error) && 
      <ConfirmationWithOk header={confirmationMsg.header} text={confirmationMsg.text} handleOk={okHandler}/>
      }
      <Wrapper className={modalActivated ? 'blur' : null}>
        <Title>Deck List</Title>
        {loading ? <LoadingSpinner /> : <Content>{allDecks}</Content>}
      </Wrapper>
    </PageLayout>
  )
}

export default DeckList