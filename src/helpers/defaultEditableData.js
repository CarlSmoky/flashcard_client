const updateStatus = {
  created: "CREATED", //When + button clicked
  edited: "EDITED",   //When change occured on cardForm
  deleted: "DELETED", //When bins button clicked
  default: "DEFAULT"  //When data fetched and set
}

// Deck
const defaultEditableDeck = {
  id: null,
  deckName: '',
  description: '',
  errors: {
    deckName: '',
    description: '',
  },
  // if modification is false, the field has never been touched, and needs to be non-empty
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

