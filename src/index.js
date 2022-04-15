import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CryptoContext from "./CryptoContext/CryptoContext";
import { Provider } from "react-redux";
import store from './Redux/Store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CryptoContext>
        <App />
      </CryptoContext>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
