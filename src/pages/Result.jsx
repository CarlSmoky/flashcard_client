import React from 'react'
import styled from 'styled-components'
import ResultHeader from '../components/ResultHeader'
import ResultItem from '../components/ResultItem'

const Result = ({
  deckName,
  numCards,
  numLearning,
  loadedCards,
  flashcarddata,
  setCardProperty
}) => {

  const setResults = () => {
    return loadedCards.map((id) => {
      let stat = flashcarddata[id];
      return <ResultItem
        key={id}
        term={stat.term}
        definition={stat.definition}
        isLearning={stat.isLearning}
        fillStar={stat.fillStar}
        setCardProperty={setCardProperty}
        cardId={id}
      />
    })
  }

  const resultItems = setResults();

  return (
    <Wrapper>
      <ResultHeader
        deckName={deckName}
        numCards={numCards}
        numLearning={numLearning}
      />
        {resultItems}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: calc(100vh - 9.3rem - 9.3rem);

  @media (max-width: 768px) {
    min-height: calc(100vh - 6rem - 6rem);
  }
`

export default Result