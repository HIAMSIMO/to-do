import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectList from './projects/ProjectList';

function Overview() {
  const [projectList, setProjectList] = useState([]);

  const getProjects = async () => {
    try {
      const { data } = await axios.get('/api/projects/all');
      setProjectList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <h1>Overview</h1>
      <ProjectList
        projects={projectList}
        showFilter
        showTimeSpentFilter
        showTaskFilter
      />
    </div>
  );
}

export default Overview;
