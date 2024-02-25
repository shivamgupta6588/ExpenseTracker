import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

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
      setTransactions(transactions.filter((transaction) => transaction._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Group transactions by category
  const groupedTransactions = {};
  transactions.forEach((transaction) => {
    if (!groupedTransactions[transaction.category]) {
      groupedTransactions[transaction.category] = [];
    }
    groupedTransactions[transaction.category].push(transaction);
  });

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4 self-center">Transactions List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : Object.keys(groupedTransactions).length > 0 ? (
        <>
          {Object.keys(groupedTransactions).map((category) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-bold mb-2">
                {category} (Total: ₹{' '}
                {groupedTransactions[category]
                  .reduce((acc, cur) => acc + cur.amount, 0)
                  .toLocaleString('en-US', { maximumFractionDigits: 2 })}
                )
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {groupedTransactions[category].map((transaction) => (
                  <div
                    key={transaction._id}
                    className="bg-[#ffdc99] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                  >
                    <div className="p-4">
                      <div className="text-lg font-semibold">{transaction.description}</div>
                      <div className="mt-1 text-gray-600">
                        Date: {formatDate(new Date(transaction.date).toLocaleDateString())}
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <div className="text-lg">
                            ₹{' '}
                            {transaction.amount.toLocaleString('en-US', {
                              maximumFractionDigits: 2,
                            })}
                          </div>
                          <div className="mt-1">{transaction.type}</div>
                        </div>
                        <div>
                          <Link to={`/update-transaction/${transaction._id}`}>
                            <button className="mr-4 text-blue-500 hover:text-blue-700 focus:outline-none transition-transform transform hover:scale-110">
                              <FaEdit />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(transaction._id)}
                            className="text-red-500 hover:text-red-700 hover:scale-110 focus:outline-none"
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>No Transaction to show</p>
      )}
    </div>
  );
};

export default TransactionList;
