import { errorMessage, truncate } from '../utilities';

describe('truncate text with maxLength', () => {
  test('should return text with ...', () => {
  
    const text = 'This is sample text without any makeing sense';
    const maxLength = 5;
    const result = 'This ...';
    expect(truncate(text, maxLength)).toBe(result);
  });
  
  test('undefined should return empty string', () => {
  
    const text = undefined;
    const maxLength = 5;
    const result = '';
    expect(truncate(text, maxLength)).toBe(result);
  });

  test('short string should not truncate', () => {
  
    const text = "short";
    const maxLength = 6;

    expect(truncate(text, maxLength)).toBe(text);
  });


})

const maxLength = 5
const deckNameMinLength = 3;
const errorStrings = {
  deckLengthMessage: `Must be more than ${deckNameMinLength} characters and less than ${maxLength} charactors long!`,
  exceedLengthMessage: `Must be less than ${maxLength} charactors long!`,
  required: 'Required'
}

const errorFactory = (name, error) => {
  return {
    key: name,
    message: error
  }
}


describe('errorMessage', () => {
  test('should give Required error when deckName is empty', () => {
  
    const name = 'deckName';
    const value = '';

    expect(errorMessage(name, value, maxLength)).toEqual(errorFactory(name, errorStrings.required));
  });

  test('should give decknameError when deckName is uses leading white space to meet min length', () => {
    const name = 'deckName';
    const value = '  hi';

    expect(errorMessage(name, value, maxLength)).toEqual(errorFactory(name, errorStrings.deckLengthMessage))
  })

  test('should give decknameError when deckName is uses trailing white space to meet min length', () => {
    const name = 'deckName';
    const value = 'hi  ';

    expect(errorMessage(name, value, maxLength)).toEqual(errorFactory(name, errorStrings.deckLengthMessage))
  })
})




/*
deckName:
√ should give Required error when deckName is empty
should give decknameError when deckName is too short
should give decknameError when deckName is too long
should give Required error when deckName is white space
should give decknameError when deckName is uses leading white space to meet min length "  hi"
should give decknameError when deckName is uses trailing white space to meet min length "hi  "

*/