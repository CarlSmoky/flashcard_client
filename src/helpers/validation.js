import { updateStatus } from './defaultEditableData'


const failsValidation = (element) => {
  if (element.updateStatus === updateStatus.deleted) return false;
  // fail validation if any field has error OR any field is untouched
  const hasError = Object.values(element.errors).some((errorField) => errorField.length > 0);
  const hasUntouchedField = Object.values(element.modifications).some((modificationField) => !modificationField);
  return hasError || hasUntouchedField;
}

const getRequiredUnmodifiedKeys = (element) => {
  return Object.entries(element.modifications)
    .filter(([key, value]) => !value)
    .map(([key, value]) => key)
}

const handleOnSaveValidation = (deck) => {
  // 1) checks if there are any problems and sets the hasProblem flag
  // 2) adds the 'Required' error if field is unmodified
  // 3) will return the hasProblem flag (caller should not continue if hasProblem is true)

  let hasProblem = false;
  let deckInfo = { ...deck.deckContents }
  // decks
  if (failsValidation(deckInfo)) {
    hasProblem = true;
    const unmodifiedKeys = getRequiredUnmodifiedKeys(deckInfo);
    unmodifiedKeys.forEach((key) => {
      deckInfo.errors[key] = "Required";
    })
    deck.setDeckContents({ ...deckInfo });
  }

  // cards
  let cardsInfo = [...deck.cardContents];
  cardsInfo.forEach((card, index) => {
    if (failsValidation(card)) {
      hasProblem = true;
      const unmodifiedKeys = getRequiredUnmodifiedKeys(card);
      unmodifiedKeys.forEach((key) => {
        cardsInfo[index].errors[key] = "Required";
      })
    }
  })
  deck.setCardContents([...cardsInfo]);

  return hasProblem;
}

export {failsValidation, getRequiredUnmodifiedKeys, handleOnSaveValidation};