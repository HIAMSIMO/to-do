import React from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/nav/Navbar';
import ProjectList from '../components/projects/ProjectList';

function Home() {
  return (
    <Layout>
      <Navbar />
      <ProjectList />
    </Layout>
  );
}
export default Home;
