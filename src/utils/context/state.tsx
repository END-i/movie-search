import React, { createContext } from "react";

import { IInitialState } from "utils/types";
import initialState from "./initialState";

export const StateContext = createContext<IInitialState>(initialState);

interface StateContextProps {
  children: React.ReactNode;
  state: IInitialState;
}

export default function ({ children, state }: StateContextProps) {
  console.log("GLOBAL STATE :>> ", state);
  return <StateContext.Provider value={state}>{children}</StateContext.Provider>;
}
