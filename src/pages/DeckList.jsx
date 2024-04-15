import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useModal } from "../providers/ModalProvider";
import { deleteDeckAndCards } from "../helpers/deckAndCardsHelpers";
import { modes } from "../helpers/modes"
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
  const [mode, setMode] = useState(modes.delete.before);
  const [displayMsg, setDisplayMsg] = useState("");
  const [deleteDeckId, setDeleteDeckId] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    closeModal();
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
    setMode(modes.delete.process);
  }

  const handleCancel = () => {
    setMode(modes.delete.before);
    const path = `/decklist`;
    navigate(path);
    closeModal();
  }

  const handleOk = () => {
    navigate(0);
    setMode(modes.delete.before);
    const path = `/decklist`;
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
    }
    if (error) {
      setMode(modes.delete.error);
    }
  }

  useEffect(() => {
    if (mode === modes.delete.process) {
      deleteDeck(deleteDeckId);
    }
    if (mode === modes.delete.warning) {
      setDisplayMsg("After deleting, you cannot restore all deck and cards data. Are you sure?")
    }
    if (mode === modes.delete.error) {
      setDisplayMsg("Something went wrong...")
    }
    if (mode === modes.delete.updated) {
      setDisplayMsg("Deck and cards are deleted.");
    }
  }, [mode])

  const allDecks = decks.map(deck => {
    return (
      <DeckItem
        key={deck.id}
        id={deck.id}
        deckName={deck.deck_name}
        description={deck.description}
        user_id={deck.user_id}
        setMode={setMode}
        setDisplayMsg={setDisplayMsg}
        setDeleteDeckId={setDeleteDeckId}
        setUserId={setUserId}
      />
    )
  });

  return (
    <PageLayout>
      {mode === modes.delete.warning &&
        <GenericConfirmation text={`Do you want to delete?`} info={displayMsg}>
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
      {mode === modes.delete.process &&
        <GenericConfirmation text={"Processing"} >
          <LoadingSpinner/>
        </GenericConfirmation>
      }
      {mode === modes.delete.updated &&
        <GenericConfirmation text={`Delete Success`} info={displayMsg}>
          <Button
            text='Ok'
            buttonType="button"
            onButtonClick={(handleOk)}
          />
        </GenericConfirmation>
      }
      {mode === modes.delete.error &&
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