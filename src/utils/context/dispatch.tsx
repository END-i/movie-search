import React, { createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { IType, IDispatch } from "utils/types";
import initialState from "./initialState";

export const DispatchContext = createContext((type: IType, value: any) => {});

interface DispatchContextProps {
  children: React.ReactNode;
  dispatch: React.Dispatch<IDispatch>;
}

export default function ({ children, dispatch: _dispatch }: DispatchContextProps) {
  const dispatch = (type: IType, value: any) => _dispatch({ type, value });

  const { search } = useLocation();

  useEffect(() => {
    if (search) {
      const param: { [key: string]: any } = {
        query: initialState.query,
        page: initialState.page,
      };

      search
        .slice(1)
        .split("&")
        .forEach((el) => {
          const [name, value] = el.split("=");
          if (name === "query" || "page") {
            param[name] = value;
          }
          if (name === "lang") {
            const [key] = value.split("-");
            dispatch("lang", { key: key, value });
          }
          if (name === "searchBy" && (value === "movies" || "actors")) {
            dispatch("searchBy", { key: value, value });
          }
        });
      dispatch("query", param.query);
      dispatch("page", param.page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>;
}
