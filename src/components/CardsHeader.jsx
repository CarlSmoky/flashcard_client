import React from 'react'
import styled from "styled-components"


const CardsHeader = ({ deck_name, flashcarddata, current }) => {

  return (
      <CardHeaderStyle>
      <Header>{deck_name}</Header>
        {flashcarddata && flashcarddata.length > 0 ? (
            <CardCount>
              {current + 1} / {flashcarddata.length}
            </CardCount>
        ) : (
          ""
        )}
      </CardHeaderStyle>
  )
}

const CardHeaderStyle = styled.div`
  width: 80%;
  margin: 2rem auto 0;
`

const Header = styled.h4`
  font-size: 2rem;
  text-align: left;
`

const CardCount = styled.h4`
  font-size: 1.5rem;
`


export default CardsHeader