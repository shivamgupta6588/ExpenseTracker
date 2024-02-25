import express from 'express';
import { register, login, signout,updateUser,getUser} from '../controllers/user.controller.js';
import {verifyToken} from '../middlewares/verifyUser.js';

const router = express.Router();

router.post('/signin',login);
router.post('/signup', register);
router.get('/signout',signout);
router.post('/update-user/:id',verifyToken,updateUser);
router.get('/get-user/:id',verifyToken,getUser);

export default router;
