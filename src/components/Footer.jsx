import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 9rem;
  border-top: var(--side-column-border) solid var(--black-primary);

  p {
    font-size: 1.6rem;
    font-family: var(--tertiary-font);
  }

  @media (max-width: 768px) {
    height: 5.2rem;

    p {
      font-size: 1rem; 
    }
  }
`
const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <StyledFooter>
      <p>© {currentYear} Dokodemo Card. All rights reserved</p>
    </StyledFooter>
  )
}

export default Footer
