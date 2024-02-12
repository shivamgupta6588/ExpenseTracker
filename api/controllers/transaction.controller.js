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

// Controller function to get transactions for the current user
export const getTransactions = async (req, res, next) => {
    try {
      const { id } = req.params; // Access id from URL params
      console.log(id);
      const transactions = await Transaction.find({ reference: id });
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteTransaction = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const deletedTransaction = await Transaction.findByIdAndDelete(id);
  
      // Check if the transaction exists
      if (!deletedTransaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
  
      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
  


