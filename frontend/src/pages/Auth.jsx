import React from 'react';
import Layout from '../components/Layout';
import Login from '../components/auth/Login';

function Auth() {
  return (
    <Layout>
      <div>
        <Login />
      </div>
    </Layout>
  );
}

export default Auth;
