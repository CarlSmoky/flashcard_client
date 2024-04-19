import GenericConfirmation from "./GenericConfirmation";
import Button from "./Button";

const ConfirmationWithOk = ({ header, text, handleOk }) => {
  return (
    <GenericConfirmation header={header} text={text}>
      <Button
        text='Ok'
        buttonType="button"
        onButtonClick={handleOk}
      />
    </GenericConfirmation>
  )
}

export default ConfirmationWithOk