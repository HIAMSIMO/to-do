import express from 'express';
import { getUserInfo, updateUser,createUser,getAllUsers } from '../controllers/user.js';

const router = express.Router();

router.get('/all', getAllUsers);
//router.post('/add', createUser);

router.get('/me', getUserInfo);
router.put('/me', updateUser);

export default router;