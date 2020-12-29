import logo from "./logo.svg";
import "./App.css";
import AppContext, { AppContextManager } from "AppContext";
import Routes from "Routes/Routes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <AppContextManager>
      <Router>
        <Routes />
      </Router>
    </AppContextManager>
  );
}

export default App;
