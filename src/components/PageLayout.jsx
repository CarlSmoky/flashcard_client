import styled from 'styled-components'
import Navbar from './Navbar'
import Footer from './Footer'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100vw;
  min-height: 100vh;
  border-top: var(--side-column-border) solid var(--black-primary);
  border-bottom: var(--side-column-border) solid var(--black-primary);
  
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: var(--side-column-width);
    border-right: var(--side-column-border) solid var(--black-primary);
    border-left: var(--side-column-border) solid var(--black-primary);

    .logo {
    padding: 1rem;
    height: 7rem;
    border-bottom: var(--side-column-border) solid var(--black-primary);
    }

    .bottom {
      padding: 1rem;
      height: 7rem;
      border-top: var(--side-column-border) solid var(--black-primary);
    }
  }

  .center {
    width: 100%;
    position: relative;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: var(--side-column-width);
    border-right: var(--side-column-border) solid var(--black-primary);
    border-left: var(--side-column-border) solid var(--black-primary);

    .search {
      padding: 1rem;
      height: 7rem;
      border-bottom: var(--side-column-border) solid var(--black-primary);
    }
    
    .bottom {
      padding: 1rem;
      height: 7rem;
      border-top: var(--side-column-border) solid var(--black-primary);
    }
  }

  @media (max-width: 768px) {

    .left {
      .logo {
        padding: 0rem;
        height: 6rem;
      }

      .bottom {
        padding: 0;
        height: 5.2rem;
      }
    }

    .right {
      .search {
        padding: 0rem;
        height: 6rem;
      }

      .bottom {
        padding: 0;
        height: 5.2rem;
      }
    }
  }
`

const PageLayout = ({ children }) => {

  return (
    <Wrapper >
      <div className="left">
        <div className="logo">
        </div>
        <div className="middle"></div>
        <div className="bottom"></div>
      </div>
      <div className="center">
        <Navbar/>
        {children}
        <Footer />
      </div>
      <div className="right">
        <div className="search">
        </div>
        <div className="middle">
        </div>
        <div className="bottom"></div>
      </div>
    </Wrapper>
  )
}

export default PageLayout