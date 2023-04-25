import express from 'express';

import { getAllUsers, loginController, registerController } from '../controllers/userController.js';

const router = express.Router()

router.get('/all-user', getAllUsers);

router.post('/register', registerController);

router.post('/login', loginController);

export default router;