import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"
import { useModal } from '../providers/ModalProvider'
import { errorMessage } from '../helpers/messages'
import { handleOnSaveValidation } from '../helpers/validation'
import { defaultEditableDeck, defaultEditableCard } from '../helpers/defaultEditableData'
import { postCreateDeckAndCards } from "../helpers/deckAndCardsHelpers";
import { Createmodes } from "../helpers/modes";
import PageLayout from '../components/PageLayout'
import CardForm from '../components/CardForm'
import ModifyWrapper from '../components/ModifyWrapper';
import GenericConfirmation from "../components/GenericConfirmation";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const Create = () => {
  const { getAccessTokenSilently } = useAuth0();
  let navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const [error, setError] = useState('');
  const [mode, setMode] = useState(Createmodes.before)
  const [newDeckContents, setNewDeckContents] = useState({ ...defaultEditableDeck });
  const [newCardContents, setNewCardContents] = useState([{ ...defaultEditableCard }]);
  const [updateResult, SetUpdateResult] = useState('');

  const currentDeck = {
    deckContents: newDeckContents,
    setDeckContents: setNewDeckContents,
    cardContents: newCardContents,
    setCardContents: setNewCardContents,
  }

  const createNewCard = () => {
    setNewCardContents(prev => ([...prev, { ...defaultEditableCard }]));
  };

  const editCardContents = (index, cardContents) => {
    const prev = [...newCardContents];
    prev[index] = cardContents;
    setNewCardContents([...prev]);
  };

  const deleteCardForm = (index) => {
    if (newCardContents.length <= 1) { return }
    const prev = [...newCardContents];
    prev.splice(index, 1);
    setNewCardContents([...prev]);
  }

  useEffect(() => {
    if (mode === Createmodes.before) {
      closeModal();
    }
  }, [mode])

  const handleSaveClick = async (e) => {
    openModal();
    setMode(Createmodes.creating)
    // handleOnSaveValidation will return true if there is a problem
    if (handleOnSaveValidation(currentDeck)) {
      setError(errorMessage.inputError);
      return;
    }
    
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await postCreateDeckAndCards(accessToken, newDeckContents, newCardContents);
    
    if (data) {
      SetUpdateResult(data);
      setMode(Createmodes.finished)
    } 
    if (error) {
      setMode(Createmodes.error)
      const isStatusCode409 = error.message.split(" ").indexOf("409") !== -1;
      isStatusCode409 ? setError("The deck title already exists. Tyr something else.") : setError("Something went wrong.")
    }
  };

  const handleOk = () => {
    closeModal();
    const path = `/deck/${updateResult.deckId}`;
    navigate(path);
  }

  const handleGoback = () => {
    setMode(Createmodes.before);
    const path = `/create`;
    navigate(path);
    closeModal();
  }

  const disableButton = () => {
    return false;
  }

  const cardFormItems = newCardContents.map((card, index) =>
    <CardForm
      key={index}
      editCardContents={editCardContents}
      card={card}
      index={index}
      deleteCardForm={deleteCardForm}
    />
  );


  return (
    <PageLayout>
      {mode === Createmodes.creating &&
        <GenericConfirmation text="Creating" info={'Processing'}>
          <LoadingSpinner/>
        </GenericConfirmation>
      }
      {mode === Createmodes.finished &&
        <GenericConfirmation text="Created" info={`${updateResult.deckName} is successfully saved`}>
          <Button
            text='Ok'
            buttonType="button"
            onButtonClick={handleOk}
          />
        </GenericConfirmation>
      }
      {mode === Createmodes.error &&
        <GenericConfirmation text="Error" info={error}>
          <Button
            text='Ok'
            buttonType="button"
            onButtonClick={handleGoback}
          />
        </GenericConfirmation>
      }
      <ModifyWrapper
        error={error}
        deckContents={newDeckContents}
        setDeckContents={setNewDeckContents}
        cardFormItems={cardFormItems}
        updateResult={updateResult}
        handleOk={handleOk}
        handleSaveClick={handleSaveClick}
        disableButton={disableButton}
        createNewCard={createNewCard}
        headerText="Create"
      />
    </PageLayout>
  )
};

export default Create