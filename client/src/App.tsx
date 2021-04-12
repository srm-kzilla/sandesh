import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { HomePage, KeysPage, SendsPage } from './pages';
import { AuthContext } from './store/authContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isAuth } = useContext(AuthContext);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/sends">
            {isAuth ? <SendsPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/keys">
            {isAuth ? <KeysPage /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
