import React from "react";
import logo from "../../assets/img/logo.svg";
import { App, AppHeader, AppLogo } from "./styles";
// import Greetings from '../../containers/Greetings/Greetings';
// import './Popup.css';

const Popup = () => {
  return (
    <App>
      <AppHeader>
        <AppLogo src={logo} alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </AppHeader>
    </App>
  );
};

export default Popup;
