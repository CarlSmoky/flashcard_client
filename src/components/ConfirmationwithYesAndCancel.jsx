import styled from "styled-components";
import GenericConfirmation from "./GenericConfirmation";
import Button from "./Button";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const ConfirmationWithYesAndCancel = ({ header, text, handleYes, handleCancel, children }) => {
  return (
    <GenericConfirmation header={header} text={text}>
      {children}
      <ButtonWrapper>
        <Button text="Yes" buttonType="button" onButtonClick={handleYes} />
        <Button text="Cancel" buttonType="button" onButtonClick={handleCancel} />
      </ButtonWrapper>
    </GenericConfirmation>
  )
}

export default ConfirmationWithYesAndCancel