import React, { useState, useEffect, useRef, useMemo } from "react";
import ApplicationStore from "Stores/ApplicationStore";
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
  const [isLoading, setIsLoading] = useState(true);
  const appState = useRef(ApplicationStore.create());
  const unregister = useRef();

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    unregister.current = firebase.auth().onAuthStateChanged((user) => {
      appState.current.setUser(user).then(() => {
        setIsLoading(false);
      });
    });

    return () => unregister.current();
  }, []);

  const context = useMemo(() => ({ appState: appState.current, isLoading }), [
    appState.current,
    isLoading,
  ]);

  if (isLoading) return null;

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};
export default AppContext;
