import { generateUpdateMsg, truncate } from "../helpers/utilities";

export const errorMessage = {
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
    },
    error: {
      header: "Error",
      text: (error) => `${error}`
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
      text: (error) => `${error}`
    }
  },
  edit: {
    process: {
      header: "Edit",
      text: "Processing"
    },
    updated: {
      header: "Edit Success",
      text: (data) => generateUpdateMsg((data)).map((msg, i) => <p key={i}>{truncate(msg,40 )}</p>)
    },
    error: {
      header: "Error",
      text: (error) => `${error}`
    }
  },
  delete: {
    warning: {
      header: (deckName) => `Do you want to delete "${truncate(deckName, 18)}"?`,
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
      text: (error) => `${error}`
    }
  },
  stat: {
    process: {
      header: "Processing"
    },
    updated: {
      header: "Save Success",
      text: (numOfItem) => numOfItem.length > 0 ? `${numOfItem} item saved.` : `${numOfItem} items saved.`
    },
    error: {
      header: "Error",
      text: (error) => `${error}`
    }
  }
}