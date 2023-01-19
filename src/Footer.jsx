import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <StyledFooter>
      <div className="left">left</div>
      <div className="copyright">
        <p>© 2023 Flashcard! by Kaoru in Toronto, All rights reserved.</p>
      </div>
      <div className="right">right</div>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  
  .left {
    min-width: 8.5rem;
    height: 7rem;
    border-top: .4rem solid var(--black-primary);
    border-right: .4rem solid var(--black-primary);
    border-bottom: .4rem solid var(--black-primary);
    border-left: .4rem solid var(--black-primary);
  }

  .right {
    min-width: 8.5rem;
    height: 7rem;
    border-top: .4rem solid var(--black-primary);
    border-right: .4rem solid var(--black-primary);
    border-bottom: .4rem solid var(--black-primary);
    border-left: .4rem solid var(--black-primary);
  }
  .copyright {
    width: calc(100vw - 8.5rem * 2);
    height: 7rem;
    border-top: .4rem solid var(--black-primary);
    border-bottom: .4rem solid var(--black-primary);
    p {
      margin-top: 1.7rem;
      font-size: 2rem;
    }
  }
`

export default Footer
