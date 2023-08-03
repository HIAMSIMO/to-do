import express from 'express';
import { createTask, updateTask, getAllTasks, getCurrentUserTasks, deleteTask, deleteAllTasks } from '../controllers/task.js';

const router = express.Router();

router.post('/', createTask);
router.put('/:taskId', updateTask);
router.get('/all', getAllTasks);
router.get('/myTasks', getCurrentUserTasks);
router.delete('/:taskId', deleteTask);
router.delete('/user', deleteAllTasks);

export default router;
