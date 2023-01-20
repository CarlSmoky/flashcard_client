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
  width: calc(100vw - 9.3rem - 9.3rem);
  height: 7rem;
  border-top: var(--side-column-border) solid var(--black-primary);
    
  p {
    margin-top:3rem;
    font-size: 1.5rem;
  }
  
`

export default Footer
