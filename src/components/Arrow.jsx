import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import styled, { css } from "styled-components";

const Wrapper = styled.button`
  margin: auto;
  
  ${({ disabled }) => {
  return disabled
    ? css`
      cursor: not-allowed;
      filter: invert(45%) sepia(5%) saturate(634%) hue-rotate(192deg) brightness(92%) contrast(93%);
      `
    : css`
      cursor: pointer;
    `
  }}
`
const Arrow = ({ direction, onClick, disabled, alt }) => (
  <Wrapper onClick={onClick} disabled={disabled} alt={alt} >
    {
      direction === "left" ?
        (<GrFormPrevious size={30} />) : (<GrFormNext size={30} />)

    }
  </Wrapper>
)
export default Arrow