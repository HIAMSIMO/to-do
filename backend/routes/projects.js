import express from 'express';
import { createProject, updateProject, getAllProjects, getUserProjects, deleteProject,getUsersInProject } from '../controllers/project.js';

const router = express.Router();

router.post('/', createProject);
router.put('/:projectId', updateProject);
router.get('/', getAllProjects);
router.get('/user', getUserProjects);
router.delete('/:projectId', deleteProject);
router.get('/:projectId/users', getUsersInProject);
export default router;
