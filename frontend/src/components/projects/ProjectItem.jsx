import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import classes from './ProjectItem.module.scss';

function ProjectItem({ project, deleteProject }) {
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
      <td className={classes.project_users}>
        {project.users.map((user) => (
          <span key={user._id}>{user.username}</span>
        ))}
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
