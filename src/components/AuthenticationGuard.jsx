import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 100vh;
`

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <Container>
        <LoadingSpinner />
      </Container>
    ),
  });

  return <Component />;
};
