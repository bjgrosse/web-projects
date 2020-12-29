import React, { useState, useEffect, useRef, useMemo } from "react";

import firebase from "firebase/app";

const defaultState = {
  user: null,
  isLoading: true,
};

// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const AppContext = React.createContext({
  ...defaultState,
});

export const AppContextManager = (props) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const unregister = useRef();

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    setIsLoading(true);
    unregister.current = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unregister.current();
  }, []);

  const context = useMemo(() => ({ user, isLoading }), [user, isLoading]);

  if (isLoading) return null;

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};
export default AppContext;
