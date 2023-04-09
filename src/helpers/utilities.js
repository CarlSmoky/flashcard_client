const validation = (name, value) => {
  const maxLength = 5;
  const deckNameMinLength = 3;
  const exceedLengthDeckMessage = `Must be more than 3 characters and less than ${maxLength} charactors long!`;
  const exceedLengthMessage = `Must be less than ${maxLength} charactors long!`;

  let error = {
    key: name,
    message: ''
  }
  
  switch (name) {
    case 'deckName':
      error.message = value.trim().length < deckNameMinLength || value.trim().length > maxLength ? exceedLengthDeckMessage : '';

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

export { validation, truncate };