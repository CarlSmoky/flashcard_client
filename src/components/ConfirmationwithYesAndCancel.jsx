import GenericConfirmation from "./GenericConfirmation";
import Button from "./Button";

const ConfirmationWithYesAndCancel = ({ header, text, handleYes, handleCancel, children }) => {
  return (
    <GenericConfirmation header={header} text={text}>
      {children}
      <Button text="Yes" buttonType="button" onButtonClick={handleYes}/>
      <Button text="Cancel" buttonType="button" onButtonClick={handleCancel}/>
    </GenericConfirmation>
  )
}

export default ConfirmationWithYesAndCancel