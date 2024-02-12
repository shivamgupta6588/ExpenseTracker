import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const fetchTransactions = async () => {
      const userID = currentUser._id;
      try {
        // Fetch transactions from the API
        const response = await axios.get(`/api/transaction/get/${userID}`);
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [currentUser]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/transaction/delete/${id}`);
      setTransactions(transactions.filter(transaction => transaction._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleUpdate = (id) => {
    // Implement your update logic here
    console.log(`Update transaction with ID: ${id}`);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Transaction List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {transactions.map(transaction => (
            <li key={transaction._id} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold">{transaction.description}</div>
                  <div className="mt-1 text-gray-600">Category: {transaction.category}</div>
                  <div className="mt-1 text-gray-600">Date: {new Date(transaction.date).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className={`text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{transaction.amount}</div>
                  <div className="mt-1">{transaction.type}</div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={() => handleUpdate(transaction._id)} className="mr-4 text-blue-500 hover:text-blue-700 focus:outline-none"><FaEdit /></button>
                <button onClick={() => handleDelete(transaction._id)} className="text-red-500 hover:text-red-700 focus:outline-none"><MdDelete /></button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
