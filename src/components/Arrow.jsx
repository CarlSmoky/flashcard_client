import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import styled, { css } from "styled-components";

const Wrapper = styled.button`
  margin: auto;
  
  ${({ disabled }) => {
  return disabled
    ? css`
      cursor: not-allowed;
      filter: invert(85%) sepia(0%) saturate(5093%) hue-rotate(298deg) brightness(95%) contrast(97%);
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