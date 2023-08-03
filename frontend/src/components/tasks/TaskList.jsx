import axios from 'axios';
import React, { useState, useEffect } from 'react';

import toast from 'react-hot-toast';

import TaskItem from './TaskItem';
import classes from './TaskList.module.scss';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [selectedProject, setSelectedProject] = useState('');
  const [description, setDescription] = useState('');
  const [userProjects, setUserProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const getTasks = async () => {
    try {
      const { data } = await axios.get('/api/tasks/mytasks');
      setTaskList(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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
    getTasks();
  }, []);

  const addNewButtonClick = () => {
    setIsAddingNew(!isAddingNew);
  };

  const addNewTask = async (e) => {
    e.preventDefault();
    if (newTask.length <= 0) {
      toast.error('Task is empty');
      return;
    }
    try {
      const { data } = await axios.post('/api/tasks/', {
        title: newTask,
        description,
        timespent: timeSpent,
        project: selectedProject,
        user: currentUser._id,
      });
      toast.success('New task added');
      setIsAddingNew(false);
      setNewTask('');
      setTimeSpent(0);
      setSelectedProject('');
      setDescription('');
      setTaskList([...taskList, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success('Task deleted');
      setTaskList(taskList.filter((task) => task._id !== id));
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
        <form className={classes.addNewForm} onSubmit={addNewTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task name"
          />
          <input
            type="number"
            value={timeSpent}
            onChange={(e) => setTimeSpent(e.target.value)}
            placeholder="Time spent"
          />
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Select Project</option>
            {userProjects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <button type="submit">Add</button>
        </form>
      )}
      {taskList.length > 0 ? (
        <table className={classes.taskList_table}>
          <tbody>
            {taskList.map((task) => (
              <TaskItem key={task._id} task={task} deleteTask={deleteTask} />
            ))}
          </tbody>
        </table>
      ) : (
        'No Task Found. Create a new task'
      )}
    </div>
  );
}

export default TaskList;
