import { useAuth0 } from '@auth0/auth0-react';
import styled from "styled-components";

const Wrapper = styled.li`
  margin: auto;
  padding: 2rem 4rem;
  font-size: 1.6rem;
  font-family: var(--tertiary-font);
  font-weight: 300;
  transition: transform 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scaleX(1.1) scaleY(1.1);
  }
`

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <Wrapper onClick={() => loginWithRedirect()}>
                Sign In
            </Wrapper>
        )
    )
}

export default LoginButton