import React from "react";
import "./App.scss";
import { Sidebar } from "./shared/components";
import { Sends, Keys } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
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
