import express from 'express';
import {addTransaction, getTransactions, deleteTransaction} from '../controllers/transaction.controller.js';

const router = express.Router();

router.post('/add',addTransaction);
router.get('/get/:id', getTransactions);
router.delete('/delete/:id', deleteTransaction);


export default router;
