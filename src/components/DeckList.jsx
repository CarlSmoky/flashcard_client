import React from 'react'
import Decks from './Decks'

const DeckList = ({ content }) => {

  return (
    <>
      <Decks title='Recent' />
      <Decks title='Recommended' />
    </>
  )
}

export default DeckList