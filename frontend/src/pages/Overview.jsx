import React from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/nav/Navbar';
import OverviewComponent from '../components/Overview';

function Overview() {
  return (
    <Layout>
      <Navbar />
      <OverviewComponent />
    </Layout>
  );
}

export default Overview;
