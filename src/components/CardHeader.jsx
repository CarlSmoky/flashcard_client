import styled from "styled-components";
import Star from "./Star";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
`;

const CardSideTitle = styled.h3`
  font-size: 1.8rem;
  font-family: var(--secondary-font);
  font-weight: 600;
  text-transform: uppercase;
  text-align: left;
  margin: auto 2rem;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin: auto 1rem;
  }
`

const CardHeader = ({
  title,
  fillStar,
  setCardProperty,
  cardId,
}) => {

  return (
    <Wrapper>
      <CardSideTitle>{title}</CardSideTitle>
      <Star
        fillStar={fillStar}
        setCardProperty={setCardProperty}
        cardId={cardId}
      />
    </Wrapper>
  )
}

export default CardHeader