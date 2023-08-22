const errorMessage = (name, value, maxLength = 255) => {
  const deckNameMinLength = 3;
  const deckLengthMessage = `Must be more than ${deckNameMinLength} characters and less than ${maxLength} charactors long!`;
  const exceedLengthMessage = `Must be less than ${maxLength} charactors long!`;

  let error = {
    key: name,
    message: ''
  }

  switch (name) {
    case 'deckName':
      if (value.trim().length < deckNameMinLength || value.trim().length > maxLength) {
        error.message = deckLengthMessage;
      }

      if (value.trim().length === 0) {
        error.message = 'Required';
      }

      break;

    case 'description':
      if (value.length > maxLength) {
        error.message = exceedLengthMessage;
      }

      break;

    case 'term':
      if (value.length === 0) {
        error.message = 'Required';
      }

      if (value.length > maxLength) {
        error.message = exceedLengthMessage;
      }

      break;

    case 'definition':
      if (value.length === 0) {
        error.message = 'Required';
      }

      if (value.length > maxLength) {
        error.message = exceedLengthMessage;
      }

      break;

    default:
      break;
  }
  return error;
}

const truncate = (text, maxLength) => {
  if (!text) return '';
  let displayText = text;
  if (text.length > maxLength) {
    displayText = text.slice(0, maxLength) + '...';
  }
  return displayText;
}

const formatPluralText = (count, baseText) => {
  if (count > 1) return baseText + `s are`;
  return baseText + ` is`;
}

const generateUpdateMsg = (editDeckResult) => {
  let msg = [];
  if (editDeckResult.updateDeckName) msg = [...msg, `Deck: ${editDeckResult.updateDeckName}`];
  if (editDeckResult.updateDescription && editDeckResult.updateDescription.length > 0) msg = [...msg, `Description: ${editDeckResult.updateDescription}`];
  if (editDeckResult.numOfUpdatedCard && editDeckResult.numOfUpdatedCard > 0) msg = [...msg, `${editDeckResult.numOfUpdatedCard} ${formatPluralText(editDeckResult.numOfUpdatedCard, 'card')} changed`];
  if (editDeckResult.numOfDeletedCards && editDeckResult.numOfDeletedCards > 0) msg = [...msg, `${editDeckResult.numOfDeletedCards} ${formatPluralText(editDeckResult.numOfDeletedCards, 'card')} deleted`];
  if (editDeckResult.numOfCreatedCard && editDeckResult.numOfCreatedCard > 0) msg = [...msg, `${editDeckResult.numOfCreatedCard} ${formatPluralText(editDeckResult.numOfCreatedCard, 'card')} created`];
  return msg;
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


export { errorMessage, truncate, generateUpdateMsg, scrollToTop };