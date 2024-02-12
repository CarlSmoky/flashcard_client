import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <StyledFooter>
      <p>© {currentYear} Flashcard! by Kaoru in Toronto. All rights reserved</p>
    </StyledFooter>
  )
}

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
    height: 6rem;

    p {
      font-size: 1rem; 
    }
  }
  
`

export default Footer
