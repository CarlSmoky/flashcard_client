import React, { useState } from 'react'
import styled from "styled-components"
import { RxCross2 } from 'react-icons/rx'


const CardsHeader = ({ deck_name, selectedCardIndices, current, className, setFinish }) => {

  return (
      <CardsHeaderStyle className={className}>
        <Left>
        </Left>
        <Center>
          <Header>{deck_name}</Header>
          {selectedCardIndices && selectedCardIndices.length > 0 ? (
            <CardCount>
              {current + 1} / {selectedCardIndices.length}
            </CardCount>
          ) : (
            ""
          )}
        </Center>
        <Right>
          <RxCross2 onClick={() => setFinish(true)}/>
        </Right>
      </CardsHeaderStyle>
  )
}

const CardsHeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  

  &.blur {
    filter: blur(2rem);
  }
`

const Left = styled.div`
  margin: 0 3.3rem;
`

const Center = styled.div`
width: 80%;
max-width: 70rem;
`

const Right = styled.div`
  margin: 2rem;
  
  svg   {
    font-size: 2.5rem;
    padding: .2rem;
    border-radius: 50%;
    transition: all .3s;
    stroke-width: 1.2;

    &:hover {
    background: var(--grey-primary);
    opacity: 0.6;
    color: white;
    }
  }
`

const Header = styled.h2`
  font-size: 2rem;
  text-align: left;
  max-width: 70rem;
  margin: 2rem auto 0;
`

const CardCount = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`


export default CardsHeader