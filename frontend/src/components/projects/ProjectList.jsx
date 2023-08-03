import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ProjectItem from './ProjectItem';
import classes from './ProjectList.module.scss';

function ProjectList() {
  const [projectList, setProjectList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', users: [] });
  const [userProjects, setUserProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const getProjects = async () => {
    try {
      const { data } = await axios.get('/api/projects/all');
      console.log('all Projects:', data); // check if there is any data
      setProjectList(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserProjects = async () => {
    try {
      const { data } = await axios.get('/api/projects/users', {
        params: { user: currentUser._id },
      });
      setUserProjects(data);
      console.log('Project related to user:', data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get('/api/users/all');
      setAllUsers(data);
      console.log('user Projects:', data); // check if there is any data
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/users/me');
      setCurrentUser(data);
      console.log('Current User:', data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchUserProjects();
    getProjects();
    fetchAllUsers();
  }, []);

  const addNewButtonClick = () => {
    setIsAddingNew(!isAddingNew);
  };

  const handleCheckboxChange = (userId) => {
    setNewProject((prevProject) => {
      if (prevProject.users.includes(userId)) {
        return { ...prevProject, users: prevProject.users.filter((id) => id !== userId) };
      }
      return { ...prevProject, users: [...prevProject.users, userId] };
    });
  };

  const addNewProject = async (e) => {
    e.preventDefault();
    const { title, description, users } = newProject;

    if (!Array.isArray(users)) {
      toast.error('Invalid users data. Users must be an array.');
      return;
    }

    try {
      const { data } = await axios.post('/api/projects/', {
        title,
        description,
        users,
      });
      toast.success('New project added');
      setIsAddingNew(false);
      setNewProject({ title: '', description: '', users: [] });
      setProjectList([...projectList, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      toast.success('Project deleted');
      setProjectList(projectList.filter((project) => project._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={classes.topBar}>
        <button type="button" className={classes.addNew} onClick={addNewButtonClick}>
          Add New
        </button>
      </div>
      {isAddingNew && (
        <form className={classes.addNewForm} onSubmit={addNewProject}>
          <input
            type="text"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            placeholder="Project title"
          />
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            placeholder="Description"
          />
          <select
            multiple
            value={newProject.users}
            onChange={(e) => handleCheckboxChange(e.target.value)}
          >
            {allUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
      )}
      {projectList.length > 0 ? (
        <table className={classes.projectList_table}>
          <tbody>
            {projectList.map((project) => (
              <ProjectItem
                key={project._id}
                project={project}
                users={allUsers}
                deleteProject={deleteProject}
              />
            ))}
          </tbody>
        </table>
      ) : (
        'No Projects Found. Create a new project'
      )}
    </div>
  );
}

export default ProjectList;
