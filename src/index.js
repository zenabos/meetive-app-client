import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";

ReactDOM.render(
  <React.StrictMode>
    <AuthProviderWrapper>
      <Router>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <App />
        </LocalizationProvider>
      </Router>
    </AuthProviderWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
