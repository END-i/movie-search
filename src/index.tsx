import React from "react";
import ReactDOM from "react-dom";

import { createBrowserHistory } from "history";
import { Router as BrowserRouter } from "react-router";

import Routes from "pages";
import { Provider } from "utils/context";
import "./style.css";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <Provider>
        <Routes />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
