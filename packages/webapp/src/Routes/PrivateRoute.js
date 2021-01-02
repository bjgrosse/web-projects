import React, { useContext, useState, useEffect } from "react";
import AppContext from "AppContext";
import { observer } from "mobx-react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  let { appState } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        appState.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default observer(PrivateRoute);
