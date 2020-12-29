import React, { useContext, useState, useEffect } from 'react';

import firebase from "firebase/app";

import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
    emailProvider: new firebase.auth.EmailAuthProvider(),
    facebookProvider: new firebase.auth.FacebookAuthProvider()
  };
  
const Login = props => {
    let uiConfig = {
        credentialHelper: "none",
    
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          // Avoid redirects after sign-in.
          signInSuccessWithAuthResult: () => {}
        }
      };

   return (
    <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
    );
}
export default Login;