import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
const Logout = (props) => {
  const history = useHistory();
  useEffect(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.replace("/");
      });
  }, []);
  return null;
};
export default Logout;
