const failsValidation = (element) => {
  // fail validation if any field has error OR any field is untouched
  const hasError = Object.values(element.errors).some((errorField) => errorField.length > 0);
  const hasUntouchedField = Object.values(element.modifications).some((modificationField) => !modificationField);
  return hasError || hasUntouchedField;
}

export default failsValidation;