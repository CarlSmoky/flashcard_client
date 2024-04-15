import GenericConfirmation from "./GenericConfirmation";
import LoadingSpinner from "./LoadingSpinner";

const Process = ({header}) => {
  return (
    <GenericConfirmation header={header} ><LoadingSpinner/></GenericConfirmation>
  )
}

export default Process