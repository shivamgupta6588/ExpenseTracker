import express from 'express';
import { register, login, signout } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signin',login);
router.post('/signup', register);
router.get('/signout',signout);

export default router;
