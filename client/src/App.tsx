import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, KeysPage, SendsPage, MailingListsPage, ProfilePage } from './pages';
import { useAuth } from './store/authContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const { isAuth } = useAuth();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sends" element={isAuth ? <SendsPage /> : <Navigate replace to="/" />} />
          <Route path="/keys" element={isAuth ? <KeysPage /> : <Navigate replace to="/" />} />
          <Route path="/lists" element={isAuth ? <MailingListsPage /> : <Navigate replace to="/" />} />
          <Route path="/profile" element={isAuth ? <ProfilePage /> : <Navigate replace to="/" />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
