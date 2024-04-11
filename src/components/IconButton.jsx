import styled, { css } from "styled-components";

const Wrapper = styled.button`
    transition: transform .1s ease-out;
    padding: .5rem;
    color: var(--black-primary);

    ${({ disabled }) => {
      return disabled
      ? css`
        cursor: not-allowed;
        filter: invert(85%) sepia(0%) saturate(5093%) hue-rotate(298deg) brightness(95%) contrast(97%);
        `
      : css`
        &:hover {
        cursor: pointer;
        transform: scaleX(1.2) scaleY(1.2);
      }
      `
    }}

    svg {
    font-size: 2rem;
    }
`

const IconButton = ({ disabled, onClick, children, alt }) => {
  return (
    <Wrapper disabled={disabled} onClick={onClick}>
      {children}
      <span className="visually-hidden">{alt}</span>
    </Wrapper>
  )
}

export default IconButton