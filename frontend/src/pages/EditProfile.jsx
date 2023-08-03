import React from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/nav/Navbar';
import EditProfileForm from '../components/profile/EditProfileForm';

function EditProfile() {
  return (
    <Layout>
      <Navbar />
      <EditProfileForm />
    </Layout>
  );
}

export default EditProfile;
