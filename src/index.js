import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TagManager from "react-gtm-module";
import App from "./App.jsx";
import "./index.css";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import ModalProvider from "./providers/ModalProvider.js";

const {REACT_APP_GTM_ID} = process.env;
if (!REACT_APP_GTM_ID) {
  throw new Error("Google Tag Manager ID is not defined");
}

const tagManagerArgs = {
  gtmId: REACT_APP_GTM_ID
}

TagManager.initialize(tagManagerArgs)


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <ModalProvider>
          <App />
        </ModalProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
