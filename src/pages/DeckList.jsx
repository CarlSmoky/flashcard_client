import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useModal } from "../providers/ModalProvider";
import { deleteDeckAndCards } from "../helpers/deckAndCardsHelpers";
import PageLayout from "../components/PageLayout";
import DeckItem from "../components/DeckItem";
import LoadingSpinner from "../components/LoadingSpinner";
import GenericConfirmation from "../components/GenericConfirmation";
import Button from "../components/Button";

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
  const [deleteMode, setDeleteMode] = useState("Before");
  const [displayMsg, setDisplayMsg] = useState("");
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
  }, []);

  const handleYes = () => {
    openModal();
    setDeleteMode("Delete");
  }

  const handleCancel = () => {
    setDeleteMode("Before");
    const path = `/decklist`;
    navigate(path);
    closeModal();
  }

  const handleOk = () => {
    setDeleteMode("Before");
    const path = `/decklist`;
    navigate(0);
    navigate(path);
    closeModal();
  }

  const deleteDeck = async (id) => {
    const accessToken = await getAccessTokenSilently();
    if (userId !== user.sub) {
      closeModal();
      throw new Error(`You are not allowed to delete this deck and cards.`);
    }
    const { data, error } = await deleteDeckAndCards(accessToken, id);
    
    if (data) {
      setDeleteMode("Deleted");
      setDisplayMsg("Deck and cards successfully deleted.");
    }
    if (error) {
      setDeleteMode("Error");
    }
  }

  const setMessage = () => {
    if (deleteMode === "Warning") {
      setDisplayMsg("After deleting, you cannot restore all deck and cards data. Are you sure?")
    }
    if (deleteMode === "Error") {
      setDisplayMsg("Something went wrong...")
    }
  }

  useEffect(() => {
    if (deleteMode === "Delete") {
      deleteDeck(deleteDeckId);
    }
    if (deleteMode === "Warning") {
      setMessage();
    }
    if (deleteMode === "Error") {
      setMessage();
    }
  }, [deleteMode])

  console.log(displayMsg)


  const allDecks = decks.map(deck => {
    return (
      <DeckItem
        key={deck.id}
        id={deck.id}
        deckName={deck.deck_name}
        description={deck.description}
        user_id={deck.user_id}
        disabled={modalActivated}
        setDeleteMode={setDeleteMode}
        setDisplayMsg={setDisplayMsg}
        deleteMode={deleteMode}
        setDeleteDeckId={setDeleteDeckId}
        setUserId={setUserId}
      />
    )
  });


  return (
    <PageLayout>
      {modalActivated && deleteMode === "Warning" &&
        <GenericConfirmation text={`Do you want to delete ?`} info={displayMsg}>
          <Button
            text='Yes'
            buttonType="button"
            onButtonClick={handleYes}
          />
          <Button
            text='Cancel'
            buttonType="button"
            onButtonClick={handleCancel}
          />
        </GenericConfirmation>
      }
      {modalActivated && deleteMode === "Deleted" &&
        <GenericConfirmation text="Deleted Successfully" info={displayMsg}>
          <Button
            text='Ok'
            buttonType="button"
            onButtonClick={(handleOk)}
          />
        </GenericConfirmation>
      }
      {modalActivated && deleteMode === "Error" &&
        <GenericConfirmation text="Error" info={displayMsg}>
          <Button
            text='Ok'
            buttonType="button"
            onButtonClick={(handleOk)}
          />
        </GenericConfirmation>
      }
      <Wrapper className={modalActivated ? 'blur' : null}>
        <Title>Deck List</Title>
        {loading ? <LoadingSpinner /> : <Content>{allDecks}</Content>}
      </Wrapper>
    </PageLayout>
  )
}

export default DeckList