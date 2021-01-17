import React, { useState } from "react";
import "./App.scss";
import { Sidebar } from "./shared/components";
import { Home, Sends, Keys } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [login, setLogin] = useState(true);
  return (
    <div className="App w-full dark:bg-darkGray dark:text-darkFont">
      <Router>
        {login ? <Sidebar /> : ""}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/sends">
            <Sends />
          </Route>
          <Route exact path="/keys">
            <Keys />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
