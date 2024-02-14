import Transaction from "../models/transaction.model.js";
import errorHandler from "../utils/error.js";
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
  export const getFilteredTransactions = async (req, res, next) => {
    try {
        const { id } = req.params; // Access id from URL params
        const { startDate, endDate, transactionType, category } = req.query; // Access query parameters
        
        // Construct the filter object based on the provided query parameters
        const filter = { reference: id };
        if (startDate) filter.date = { $gte: new Date(startDate) };
        if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate) };
        if (transactionType) filter.type = transactionType;
        if (category) filter.category = category;

        // Fetch transactions based on the filter object
        const transactions = await Transaction.find(filter);
        
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};

  
export const updateTransaction = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateTransaction = await Transaction.findById(id);
    if (!updateTransaction)
      return next(errorHandler(404, 'Transaction not found'));

    // Assuming `reference` is a property of the `updateTransaction` object
    if (req.user.id !== updateTransaction.reference)
      return next(errorHandler(401, 'You can update only your Transaction'));

    // Find the transaction by ID and update it
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTransaction);
  } catch (err) {
    next(err);
  }
};


export const getTransaction = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const transactions = await Transaction.findById(id);
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};


