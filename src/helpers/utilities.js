const generateErrorMessage = (name, value, maxLength = 255 ) => {
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
  // Deck
  if (updateResult.updateDeckData && updateResult.updateDeckData.deck_name) msg = [...msg, `Deck name: ${updateResult.updateDeckData.deck_name}`];
  if (updateResult.updateDeckData && updateResult.updateDeckData.description.length > 0) msg = [...msg, `Description: ${truncate(updateResult.updateDeckData.description, 20)}`];

  // Card
  if (updateResult.updateCardsData && updateResult.updateCardsData.length > 0) msg = [...msg, `${updateResult.updateCardsData.length} ${formatPluralText(updateResult.updateCardsData.length, 'card')} changed`];
  if (updateResult.deleteCardsData && updateResult.deleteCardsData.length > 0) msg = [...msg, `${updateResult.deleteCardsData.length} ${formatPluralText(updateResult.deleteCardsData.length, 'card')} deleted`];
  if (updateResult.createdCardsData && updateResult.createdCardsData.length > 0) msg = [...msg, `${updateResult.createdCardsData.length} ${formatPluralText(updateResult.createdCardsData.length, 'card')} created`];

  return msg;
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


export { generateErrorMessage, truncate, generateUpdateMsg, scrollToTop };