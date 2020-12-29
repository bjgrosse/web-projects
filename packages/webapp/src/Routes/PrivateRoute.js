import React, { useContext, useState, useEffect } from "react";
import AppContext from "AppContext";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  let { user } = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
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

export default PrivateRoute;
