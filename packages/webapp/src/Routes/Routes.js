import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "Routes/Login";
import Logout from "Routes/Logout";
import Home from "Routes/Home";
import Album from "Routes/Album";
import EditAlbum from "Routes/EditAlbum";
import Profile from "Routes/Profile";
import PrivateRoute from "Routes/PrivateRoute";
const Routes = (props) => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/album/:id">
        <Album />
      </Route>
      <Route path="/edit">
        <EditAlbum />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <PrivateRoute path="/profile">
        <Profile />
      </PrivateRoute>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
};
export default Routes;
