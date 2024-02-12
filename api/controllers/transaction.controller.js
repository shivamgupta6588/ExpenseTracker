import Transaction from "../models/transaction.model.js";

export const addTransaction = async (req, res, next) => {
    try {
        const { description, amount, type, category, date, userID } = req.body; // Access userID from request body

        const newTransaction = new Transaction({
            description,
            amount,
            type,
            category,
            date,
            reference: userID
        });

        await newTransaction.save();
        res.status(201).json({ message: "Transaction has been created!" });
    } catch (error) {
        next(error);
    }
};


export const getTransactions=async(req,res,next)=>{
        try {
            const userId = req.user._id; 
            const transactions = await Transaction.find({ reference: userId });    
            res.status(200).json(transactions);
        } catch (error) {
            next(error);
        }
};
