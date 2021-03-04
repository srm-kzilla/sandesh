import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage, KeysPage, SendsPage } from "./pages";

import { AuthContext } from "./store/authContext";

function App() {
  const { isAuth, signOut, login } = useContext(AuthContext);
  
  return (
    <>
      <button onClick={signOut}>Sign out</button>
      <button
        onClick={() => {
          login("YOOOOOOOOOOOOO");
        }}
      >
        Log In
      </button>

      {JSON.stringify(isAuth)}
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/sends">
            <SendsPage />
          </Route>
          <Route exact path="/keys">
            <KeysPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
