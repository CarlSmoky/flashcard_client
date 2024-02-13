import styled from 'styled-components'
import Navbar from './Navbar'
import Menu from './Menu'
import DeckList from '../pages/DeckList'
import Practice from '../pages/Practice'
import Edit from '../pages/Edit'
import Create from '../pages/Create'
import Footer from './Footer'
import ModalProvider from '../providers/ModalProvider'


const Frame = ({ content }) => {

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
        <ModalProvider>
          {content === "menu" && <Menu />}
          {content === "decklist" && <DeckList />}
          {content === "practice" && <Practice />}
          {content === "edit" && <Edit />}
          {content === "create" && <Create />}
        </ModalProvider>
        <Footer />
      </div>
      <div className="right">
        <div className="search">
          {/* <div>
          <BiSearch />
        </div> */}
        </div>
        <div className="middle">
        </div>
        <div className="bottom"></div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
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

      /* div {
        margin: 1.2rem;
        text-align: center;
        svg {
          font-size: 4rem;
        }
      } */
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
        height: 6rem;
      }
    }

    .right {
      .search {
      padding: 0rem;
      height: 6rem;
      }

      .bottom {
        padding: 0;
        height: 6rem;
      }
    }
  }
  
`

export default Frame