import React, { createContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { homePath } from "pages/_routes/routesList";
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
  const { push } = useHistory();

  useEffect(() => {
    if (search) {
      const param: { [key: string]: string | number } = {
        query: initialState.query,
        page: initialState.page,
      };

      search
        .slice(1)
        .split("&")
        .forEach((el) => {
          const [name, value] = el.split("=");
          if ("page") {
            param[name] = Number(value);
          }
          if (name === "query") {
            param[name] = value;
          }
          if (name === "searchBy") {
            const searchBy = initialState.filters.find((a) => a.value === value);
            if (searchBy) {
              dispatch("searchBy", searchBy);
            } else {
              push(homePath);
            }
          }
        });
      dispatch("query", param.query);
      dispatch("page", param.page);
    } else {
      dispatch("query", "");
      dispatch("page", 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>;
}
