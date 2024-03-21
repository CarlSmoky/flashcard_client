import styled from "styled-components";
import { Link } from "react-router-dom";
import { links } from "../helpers/links";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  background-color: var(--secondary-color);
  border-left: var(--side-column-border) solid var(--black-primary);
  z-index: 20;

  li {
    margin: auto;
    padding: 2rem 4rem;
    font-size: 1.3rem;
    transition: transform 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      transform: scaleX(1.1) scaleY(1.1);
    }
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    justify-content: flex-start;
    background-color: var(--secondary-color);
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: var(--black-primary);
      margin: 2rem;
    }
  }
`;

const RightNav = ({ open, closeNav }) => {
  return (
    <Ul open={open}>
      {links.map((link, i) => (
        <li key={i}>
          <Link to={link.link} onClick={closeNav}>{link.name}</Link>
        </li>
      ))}
    </Ul>
  )
}

export default RightNav