import { map } from "lodash";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { NOT_HEADER } from "../config/route";

const NoheaderRouter = () => {
  const _path = window.location.pathname;
  return (
    <div>
      <Switch>
        {map(NOT_HEADER, (item, key) => {
          return (
            <Route
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          );
        })}
      </Switch>
    </div>
  );
};

export default NoheaderRouter;
