import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <LoadingSpinner />
      </div>
    ),
  });

  return <Component />;
};
