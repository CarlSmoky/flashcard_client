import React from 'react'
import styled from "styled-components"


const CardsHeader = ({ deck_name, selectedCardIndices, current, className }) => {
console.log("selectedCardIndices", selectedCardIndices);
  return (
      <CardHeaderStyle className={className}>
      <Header>{deck_name}</Header>
        {selectedCardIndices && selectedCardIndices.length > 0 ? (
            <CardCount>
              {current + 1} / {selectedCardIndices.length}
            </CardCount>
        ) : (
          ""
        )}
      </CardHeaderStyle>
  )
}

const CardHeaderStyle = styled.div`
  width: 80%;
  max-width: 70rem;
  margin: 2rem auto 0;

  &.blur {
    filter: blur(2rem);
  }
`

const Header = styled.h2`
  font-size: 2rem;
  text-align: left;
`

const CardCount = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`


export default CardsHeader