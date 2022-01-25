import { useContext } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, KeysPage, SendsPage, MailingListsPage } from './pages';
import { AuthContext } from './store/authContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const { isAuth } = useContext(AuthContext);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sends" element={isAuth ? <SendsPage /> : <Navigate replace to="/" />} />
          <Route path="/keys" element={isAuth ? <KeysPage /> : <Navigate replace to="/" />} />
          <Route path="/lists" element={isAuth ? <MailingListsPage /> : <Navigate replace to="/" />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
