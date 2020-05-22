import React from "react";

import GlobalStyles from "./globalStyles";
import { Provider } from "utils/context";
import { Dashboard } from "components";

export default function () {
  return (
    <Provider>
      <GlobalStyles />
      <Dashboard />
    </Provider>
  );
}
