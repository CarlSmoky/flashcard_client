import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById('root'));

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
} else {
  axios.defaults.baseURL = "http://localhost:3001/"
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
