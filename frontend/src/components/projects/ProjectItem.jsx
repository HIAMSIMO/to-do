import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import classes from './ProjectItem.module.scss';

function ProjectItem({ project, deleteProject, users }) {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      }
      return [...prevSelectedUsers, userId];
    });
  };

  const handleAddUsers = async (projectId) => {
    try {
      await axios.put(`/api/projects/${projectId}/users`, {
        users: selectedUsers,
      });
      toast.success('Users added to project successfully');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/projects/${project._id}`);
      toast.success('Project deleted');
      deleteProject(project._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr className={classes.project_item}>
      <td className={classes.project_title}>{project.title}</td>
      <td className={classes.project_description}>{project.description}</td>
      <td>
        <select
          multiple
          value={selectedUsers}
          onChange={(e) => handleCheckboxChange(e.target.value)}
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => handleAddUsers(project._id)}>Add Users</button>
      </td>
      <td className={classes.project_timespent}>
        {project.timespent}
        minutes
      </td>
      <td className={classes.project_created_at}>
        {moment(project.createdAt).format('MMM Do YY')}
      </td>
      <td className={classes.deleteBtnContainer}>
        <button type="button" className={classes.deleteBtn} onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ProjectItem;
