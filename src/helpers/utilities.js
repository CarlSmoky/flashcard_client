const validation = (name, value) => {
  const maxLength = 5;
  const deckNameMinLength = 3;
  const exceedLengthDeckMessage = `Must be more than 3 characters and less than ${maxLength} charactors long!`;
  const exceedLengthMessage = `Must be ${maxLength} charactors long!`;

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

export { validation };