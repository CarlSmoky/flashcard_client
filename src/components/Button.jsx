import styled, { css } from "styled-components";

const ButtonStyle = styled.button`
  width: 45%;
  height: 2rem;
  padding: 1rem;
  margin: 1.5rem auto;
  border: 2px solid var(--black-primary); 
  box-shadow: 1px 1px 0px 0px  black, 2px 2px 0px 0px black, 3px 3px 0px 0px black, 4px 4px 0px 0px black, 5px 5px 0px 0px black;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  color: var(--grey-primary);
  

  span {
    font-family: var(--tertiary-font);
    font-weight: 600;
    font-size: 1.8rem;
    text-transform: uppercase;
  }

  & {
    color: ${props => props.selected ? "var(--white-primary)" : ""};
    background: ${props => props.selected ? "var(--black-primary)" : ""};
    }

  ${({ disabled }) => {
    return disabled
      ? css`
        color: var(--grey-secondary);
        cursor: not-allowed;
      `
      : css`
      cursor: pointer;
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 4px;
        transform: scaleX(0);
        bottom: 0;
        left: 0;
        background-color: var(--white-primary);
        transform-origin: bottom right;
        color: var(--black-primary);
        transition: transform .1s ease-out;
      }

      
      &:hover::after {
        transform: scaleX(1.0);
        transform-origin: bottom left;
      }

      &:active {
        box-shadow: 0px 0px 0px 0px;
        top: 5px;
        left: 5px;
      }

      @media (max-width: 768px) {
        width: 70%;
        margin: 1rem auto;
        padding: .5rem;

        span {
          font-size: 1.6rem;
        }
      }

    `
  }}
`

const Button = ({
  text,
  buttonType,
  onButtonClick,
  disabled,
  isSelected
}) => {

  const handleButtonClick = e => {
    buttonType === 'submit' ? e.preventDefault() : e.stopPropagation();

    if (onButtonClick) {
      onButtonClick();
      return;
    }
  }

  return (
    <ButtonStyle
      selected={isSelected}
      onClick={handleButtonClick}
      disabled={disabled}
      type={buttonType}
    >
      <span>{text}</span>
    </ButtonStyle>
  )
}

export default Button