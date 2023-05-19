// Deck
const defaultEditableDeck = {
  deckName: '',
  description: '',
  errors: {
    deckName: '',
    description: '',
  },
  // if modification is false, the field has never been touched, and needs to be non-emptyy
  modifications: {
    deckName: false,
    description: true, // we can allow unmodified deck descriptions
  }
};

//Card
const defaultEditableCard = {
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

export { defaultEditableDeck, defaultEditableCard };

