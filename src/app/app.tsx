import React from "react";
import { createBrowserHistory } from "history";
import { Router as BrowserRouter } from "react-router";

import Routes from "pages";
import { Provider } from "utils/context";

const history = createBrowserHistory();

export default function () {
  return (
    <BrowserRouter history={history}>
      <Provider>
        <Routes />
      </Provider>
    </BrowserRouter>
  );
}
