import express from 'express';
import { register, login } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signin',login);
router.post('/signup', register);

export default router;
