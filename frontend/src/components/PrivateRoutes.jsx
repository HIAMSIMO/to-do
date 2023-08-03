import { Route, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Projects from '../pages/Projects';
import Overview from '../pages/Overview';
import AddUser from '../pages/AddUser';

function PrivateRoutes() {
  const { auth } = useAuth();
  console.log({ auth });

  if (auth === undefined) return 'loading...';

  if (!auth) {
    return <Navigate to="/auth" />;
  }

  const isAdmin = auth.role === 'admin';

  return (
    <>
      <Outlet />
      {isAdmin && (
        <>
          <Route path="/" element={<Overview />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/addUser" element={<AddUser />} />
        </>
      )}
    </>
  );
}

export default PrivateRoutes;
