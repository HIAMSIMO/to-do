import Project from '../models/Project.js';
import Task from '../models/Task.js';
import createError from '../utils/createError.js';
import User from '../models/User.js';


export const createProject = async (req, res, next) => {
  const { title, description, users } = req.body;

  if (!Array.isArray(users)) {
    return next(createError({ status: 400, message: 'Invalid users data. Users must be an array.' }));
  }

  const newProject = new Project({
    title,
    description,
    users,
  });

  try {
    const savedProject = await newProject.save();
    return res.status(201).json(savedProject);
  } catch (err) {
    return next(err);
  }
};


export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId).exec();
    if (!project) return next(createError({ status: 404, message: 'Project not found' }));
    if (!project.users.includes(req.body.user)) {
      return next(createError({ status: 401, message: "You don't have permission to update this project" }));
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        title: req.body.title,
        description: req.body.description,
      },
      { new: true }
    );
    return res.status(200).json(updatedProject);
  } catch (err) {
    return next(err);
  }
};

export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    return res.status(200).json(projects);
  } catch (err) {
    return next(err);
  }
};

export const getUserProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ users: req.body.user });
    return res.status(200).json(projects);
  } catch (err) {
    return next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project.users.includes(req.body.user)) {
      return next(createError({ status: 401, message: "You don't have permission to delete this project" }));
    }
    await Project.findByIdAndDelete(req.params.projectId);
    return res.json('Project Deleted Successfully');
  } catch (err) {
    return next(err);
  }
};

export const getUsersInProject = async (req, res, next) => {
    try {
      const projectId = req.params.projectId;
  
      const project = await Project.findById(projectId);
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      const users = await User.find({ _id: { $in: project.users } });
  
      return res.status(200).json(users);
    } catch (err) {
      return next(err);
    }
}

export const calculateProjectTimeSpent = async (projectId) => {
  try {
    const tasks = await Task.find({ project: projectId });
    const totalTimespent = tasks.reduce((total, task) => total + task.timespent, 0);
    await Project.findByIdAndUpdate(projectId, { timespent: totalTimespent });
  } catch (err) {
    console.error('Error calculating project timespent:', err);
  }
};
