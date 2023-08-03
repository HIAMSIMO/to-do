import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Projects from './pages/Projects';
import Overview from './pages/Overview';
import AddUser from './pages/AddUser';
import PrivateRoutes from './components/PrivateRoutes';
import useAuth from './hooks/useAuth';

function App() {
  const { userRole } = useAuth();
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fonSize: '1.8rem',
          },
        }}
      />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          {userRole === 'admin' ? (
            <Routes>
              <Route path="/projects" element={<Projects />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/addUser" element={<AddUser />} />
            </Routes>
          ) : null}
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
