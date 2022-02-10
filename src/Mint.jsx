import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./styles/reset.css";

function Mint() {
  return (
    <div className="home">
    <Provider store={store}>
      <App />
    </Provider>,
    </div>)
  };

export default Mint;
