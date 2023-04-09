import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <StyledFooter>
      <p>© 2023 Flashcard! by Kaoru in Toronto, All rights reserved.</p>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  height: 9rem;
  border-top: var(--side-column-border) solid var(--black-primary);
    
  p {
    margin-top:3rem;
    font-size: 1.5rem;
    font-family: var(--tertiary-font);
  }
  
`

export default Footer
