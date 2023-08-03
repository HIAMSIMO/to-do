import React from 'react';
import Layout from '../components/Layout';
import Register from '../components/auth/Register';
import classes from './Auth.module.scss';

function AddUser() {
  return (
    <Layout>
      <div className={classes.form_container}>
        <Register />
      </div>
    </Layout>
  );
}

export default AddUser;
