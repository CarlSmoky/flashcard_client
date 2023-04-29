import failsValidation from "../validation";

const defaultDeck = {
  deckName: '',
  description: '',
  errors: {
    deckName: '',
    description: '',
  },
  modifications: {
    deckName: false,
    description: true, // we can allow unmodified deck descriptions
  }
};

const defaultCard = {
  term: '',
  definition: '',
  errors: {
    term: '',
    definition: '',
  },
  modifications: {
    term: false,
    definition: false,
  }
};

// deck
test('deckInfo fails if deckName is unmodified and no errors', () => {
  expect(failsValidation(defaultDeck)).toBe(true);
});

test('deck with modified deck name and no errors passes validation', () => {
  const modifiedDeckWithNoErrors = {...defaultDeck, modifications: {...defaultDeck.modifications,   deckName : true}};

  expect(failsValidation(modifiedDeckWithNoErrors)).toBe(false);
});

test('fails when deck is modified but there is an error', () => {
  const modifiedDeckWithError = {...defaultDeck, modifications: {...defaultDeck.modifications, deckName : true}, errors: {...defaultDeck.errors, deckName: "required"}};

  expect(failsValidation(modifiedDeckWithError)).toBe(true);
});

// card
test('unmodified card fails with no errors', () => {
  expect(failsValidation(defaultCard)).toBe(true);
});


test('modifed card passes with no errors', () => {
  const modifiedCardWithNoError = {...defaultCard, modifications: {...defaultCard.modifications, term : true, definition : true}};

  expect(failsValidation(modifiedCardWithNoError)).toBe(false);
});

test('card with 1 unmodified field and no error fails', () => {
  const partiallyModifiedCardWithNoError = {...defaultCard, modifications: {...defaultCard.modifications, definition : true}};

  expect(failsValidation(partiallyModifiedCardWithNoError)).toBe(true);
});

test('modified card fails with error', () => {
  const modifiedCardWithNoError = {...defaultCard, modifications: {...defaultCard.modifications, term : true, definition : true} ,errors: {...defaultCard.errors, term: "required", definition: "required"}};

  expect(failsValidation(modifiedCardWithNoError)).toBe(true);
});
