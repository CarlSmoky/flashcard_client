import { generateUpdateMsg, truncate } from "../helpers/utilities";

export const errorMessage = {
  titleExists: 'This title alredy exits. Try other title',
  inputError: 'Please see the error below'
}

export const confirmationMessage = {
  practice: {
    before: {
      header: (deckName) => `${truncate(deckName, 18)}`,
      text: "Set number of cards below. Ready to start?"
    },
    warning: {
      header: "Do you want to finish?"
    }
  },
  create: {
    process: {
      header: "Processing"
    },
    updated: {
      header: "Create Success",
      text: "New deck is successfully created"
    },
    error: {
      header: "Error",
      text: (isExist) => isExist ? "The deck title already exists. Tyr something else." : "Something went wrong."
    }
  },
  edit: {
    process: {
      header: "Edit",
      text: "Processing"
    },
    updated: {
      header: "Edit Success",
      text: (data) => generateUpdateMsg((data)).map((msg, i) => <p key={i}>{msg}</p>)
    },
    error: {
      header: "Error",
      text: (isExist) => isExist ? "The deck title already exists. Tyr something else." : "Something went wrong."
    }
  },
  delete: {
    warning: {
      header: (deckName) => `Do you want to delete "${deckName}"?`,
      text: "After deleting, you cannot restore the deck and all cards data."
    },
    process: {
      header: "Processing"
    },
    updated: {
      header: "Delete Success",
      text: "Deck and cards are deleted."
    },
    error: {
      header: "Error",
      text: "Something went wrong.",
    }
  }
}