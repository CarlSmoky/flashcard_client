import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import ModalProvider from "./providers/ModalProvider.js"
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const apiServer = process.env.REACT_APP_API_SERVER_URL;

// if (process.env.REACT_APP_API_BASE_URL) {
//   axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
// } else {
axios.defaults.baseURL = apiServer;
// }

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
