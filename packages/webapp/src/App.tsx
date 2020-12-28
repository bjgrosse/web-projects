import React from "react";

import getValue from "@monorepo/common2/module1";
import { Module2Component } from "@monorepo/common2/module2";

// import {Button} from "@monorepo/common2/components"
import {Button} from "@web/ui/components"
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React {getValue()}
        </a>
        <Module2Component></Module2Component>
        <Button>Test</Button>
      </header>
    </div>
  );
}

export default App;
