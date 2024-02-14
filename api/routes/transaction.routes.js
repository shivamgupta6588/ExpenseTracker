import express from 'express';
import {addTransaction, getTransactions, deleteTransaction, getFilteredTransactions, updateTransaction, getTransaction} from '../controllers/transaction.controller.js';
import {verifyToken} from '../middlewares/verifyUser.js';
const router = express.Router();

router.post('/add',addTransaction);
router.get('/get/:id', getTransactions);
router.delete('/delete/:id', deleteTransaction);
router.get('/gets/:id', getFilteredTransactions);
router.post('/update/:id',verifyToken,updateTransaction);
router.get('/gettransaction/:id',getTransaction);


export default router;
