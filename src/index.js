import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TagManager from "react-gtm-module";
import App from "./App.jsx";
import "./index.css";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import ModalProvider from "./providers/ModalProvider.js";

const gtmId = process.env.REACT_APP_GTM_ID;
if (!gtmId) {
  throw new Error("Google Tag Manager ID is not defined");
}

const tagManagerArgs = {
  gtmId: gtmId
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
