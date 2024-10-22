import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useModal } from "../providers/ModalProvider";
import ResultHeader from "../components/ResultHeader";
import Button from "../components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  setResults,
  handleSaveClick
}) => {
  const { user } = useAuth0();
  const { modalActivated } = useModal();
  const resultItems = setResults();

  return (
    <Wrapper className={modalActivated ? "blur" : null}>
      <ResultHeader
        deckName={deckName}
        numCards={numCards}
        numLearning={numLearning}
      />
      {resultItems}
      {user?.sub &&
        <Button
          text="save"
          onButtonClick={handleSaveClick}
          disabled={modalActivated}
        />
      
      }
    </Wrapper>
  )
}

export default Result