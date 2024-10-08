import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useModal } from "../providers/ModalProvider";
import { modes } from "../helpers/modes";
import { scrollToTop } from "../helpers/utilities";
import { confirmationMessage } from "../helpers/messages";
import { getAllDecks, deleteDeckAndCards } from "../helpers/deckAndCardsHelpers";
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
  const [displayDecks, setDisplayDecks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(modes.delete.before);
  const [confirmationMsg, setConfirmationMsg] = useState({ header: "", text: "" });
  const [deleteDeckId, setDeleteDeckId] = useState(0);
  const [userId, setUserId] = useState("");
  const { param } = useParams();

  useEffect(() => {
    if (mode === modes.practice.before) {
      closeModal();
    }
    
    getDeckList();
  }, [mode, user, param]);

  const deleteYesHandler = () => {
    openModal();
    setMode(modes.delete.process);
    deleteDeck(deleteDeckId);
  }

  const deleteCancelhandler = () => {
    setMode(modes.delete.before);
    const path = "/decklist/mydeck";
    navigate(path);
    closeModal();
  }

  const okHandler = () => {
    navigate(0);
    setMode(modes.delete.before);
    const path = "/decklist/mydeck";
    navigate(path);
    closeModal();
  }

  const handler = () => {
    setMode(modes.practice.before);
    const path = "/";
    navigate(path);
    closeModal();
  }

  const isLoggedIn = () => param === "mydeck" && user;
  const filterDeckDataByUser = deckData => deckData.filter(deck => deck.user_id === user.sub);
  const mapDecks = (deck) => {
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
  }

  const getDeckList = async () => {
    setLoading(true);
    const { data, error } = await getAllDecks();

    if (data) {
      const filteredData = isLoggedIn() ? filterDeckDataByUser(data) : data
      setDisplayDecks(filteredData.map(mapDecks));
      setLoading(false);
    }

    if (error) {
      setMode(modes.practice.error);
      setConfirmationMsg({
        header: confirmationMessage.practice.error.header,
        text: confirmationMessage.practice.error.text(error.message)
      })
    }
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
      });
      scrollToTop();
    }
    if (error) {
      setMode(modes.delete.error);
      setConfirmationMsg({
        header: confirmationMessage.delete.error.header,
        text: confirmationMessage.delete.error.text(error.message)
      })
      scrollToTop();
    }
  }

  return (
    <PageLayout>
      {mode === modes.practice.error &&
        <ConfirmationWithOk header={confirmationMsg.header} text={confirmationMsg.text} handleOk={handler} />
      }
      {mode === modes.delete.warning &&
        <ConfirmationWithYesAndCancel header={confirmationMsg.header} text={confirmationMsg.text} handleYes={deleteYesHandler} handleCancel={deleteCancelhandler} />
      }
      {mode === modes.delete.process && <Process header={confirmationMsg.header} />}
      {(mode === modes.delete.updated || mode === modes.delete.error) &&
        <ConfirmationWithOk header={confirmationMsg.header} text={confirmationMsg.text} handleOk={okHandler} />
      }
      <Wrapper className={modalActivated ? 'blur' : null}>
        <Title>{isLoggedIn() ? "My Deck List" : "Deck List"}</Title>
        {loading ? <LoadingSpinner /> : <Content>{displayDecks.length !== 0 ? displayDecks : <div><p>Decks that you have created will be found here.</p></div>}</Content>}
      </Wrapper>
    </PageLayout>
  )
}

export default DeckList