const updateStatus = {
  created: "CREATED",
  deleted: "DELETED",
  edited: "EDITED",
  default: "DEFAULT"
}

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
  },
  updateStatus: updateStatus.created,
};

//Card
const defaultEditableCard = {
  id: null,
  term: '',
  definition: '',
  errors: {
    term: '',
    definition: '',
  },
  modifications: {
    term: false,
    definition: false,
  },
  updateStatus: updateStatus.created,
};

export { defaultEditableDeck, defaultEditableCard, updateStatus };

