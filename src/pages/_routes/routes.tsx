import React from "react";
import { Route, Switch, Redirect } from "react-router";

import { IRoute } from "utils/types";
import NotFound from "pages/notFound";
import routes from "./routesList";
import { Dashboard } from "components";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      {routes.map(({ path, Component }: IRoute) => (
        <Route
          key={path}
          path={`/${path}`}
          render={() => (
            <Dashboard>
              <Component />
            </Dashboard>
          )}
        />
      ))}
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
