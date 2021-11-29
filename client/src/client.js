import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const renderMethod = module.hot ? render : hydrate;
const getLibrary = (provider) => {
  return new ethers.providers.Web3Provider(provider);
};
export const Client = () => {
  return (
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </BrowserRouter>
  );
};

renderMethod(<Client />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
