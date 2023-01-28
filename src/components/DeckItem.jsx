import React from 'react'
import styled from 'styled-components'

const DeckItem = ({id, deckName, user_id}) => {
  return (
    <Card>
      <h1>{deckName}</h1>
    </Card>
  )
}

const Card = styled.div`
`

export default DeckItem