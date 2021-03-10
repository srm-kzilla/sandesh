import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, KeysPage, SendsPage } from './pages';

function App() {
  return (
    <>
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
