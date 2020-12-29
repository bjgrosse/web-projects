import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppContext from "AppContext";
import Login from "Routes/Login";
import { Link } from "react-router-dom";
const Home = (props) => {
  const { user } = useContext(AppContext);
  return (
    <div>
      <h1>Home page</h1>
      {user && (
        <p>
          welcome back, {user.displayName}
          <br />
          <Link to="/logout">log out</Link>
        </p>
      )}
      {!user && <Login />}
    </div>
  );
};
export default Home;
