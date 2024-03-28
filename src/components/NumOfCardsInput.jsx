import styled from "styled-components";

const Wrapper = styled.div`
  margin: 1rem;

  label {
    font-size: 1.7rem;
    font-family: var(--tertiary-font);
  }
`

const NumOfCardsInput = ({ onChange, settingNumCards, max }) => {
  return (
    <Wrapper>
      <label htmlFor="numCards">Cards: </label>
      <input
        onChange={onChange}
        id="numCards"
        type="number"
        name="numCards"
        min="1"
        max={max}
        value={settingNumCards}
      />
    </Wrapper>
  )
}

export default NumOfCardsInput