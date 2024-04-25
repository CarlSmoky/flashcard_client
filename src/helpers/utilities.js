const errorMessage = (name, value, maxLength = 500 ) => {
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

const generateUpdateMsg = (updateResult) => {
  let msg = [];
  if (updateResult.updateDeckName) msg = [...msg, `Deck: ${updateResult.updateDeckName}`];
  if (updateResult.updateDescription && updateResult.updateDescription.length > 0) msg = [...msg, `Description: ${truncate(updateResult.updateDescription, 20)}`];
  if (updateResult.numOfUpdatedCard && updateResult.numOfUpdatedCard > 0) msg = [...msg, `${updateResult.numOfUpdatedCard} ${formatPluralText(updateResult.numOfUpdatedCard, 'card')} changed`];
  if (updateResult.numOfDeletedCards && updateResult.numOfDeletedCards > 0) msg = [...msg, `${updateResult.numOfDeletedCards} ${formatPluralText(updateResult.numOfDeletedCards, 'card')} deleted`];
  if (updateResult.numOfCreatedCard && updateResult.numOfCreatedCard > 0) msg = [...msg, `${updateResult.numOfCreatedCard} ${formatPluralText(updateResult.numOfCreatedCard, 'card')} created`];
  if (updateResult.deckName) msg = [...msg, `New deck: ${truncate(updateResult.deckName,18 )}`]
  if (updateResult.numOfCards && updateResult.numOfCards > 0) msg = [...msg, `${updateResult.numOfCards} ${formatPluralText(updateResult.numOfCards, 'card')} saved.`];
  return msg;
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


export { errorMessage, truncate, generateUpdateMsg, scrollToTop };