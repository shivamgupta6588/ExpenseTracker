import  { useState, useEffect } from 'react';
import axios from 'axios';
import { GrPowerReset } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import { FaDownload } from "react-icons/fa";


const FilterTransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        transactionType: '',
        category: ''
    });
    const { currentUser } = useSelector(state => (state.user));

    useEffect(() => {
        const fetchTransactions = async () => {
            const userID = currentUser._id;
            try {
                const response = await axios.get(`/api/transaction/gets/${userID}`, {
                    params: filters // Pass filters as query parameters
                });
                setTransactions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [filters,currentUser._id]); // Refetch transactions whenever filters change

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const exportCSV = () => {
        const csvData = transactions.map(transaction => ({
            Description: transaction.description,
            Amount: transaction.amount,
            Type: transaction.type,
            Category: transaction.category,
            Date: new Date(transaction.date).toLocaleDateString()
        }));

        return csvData;
    };

    return (
        <div className="max-w-3xl flex  flex-col flex-wrap mx-auto p-6 bg-blue-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Transaction List</h2>
            <form className="flex flex-wrap max-sm:flex-col gap-4  mb-4">
                <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="input-field" />
                <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="input-field" />
                <select name="transactionType" value={filters.transactionType} onChange={handleFilterChange} className="input-field">
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <input type="text" name="category" value={filters.category} onChange={handleFilterChange} placeholder="Category" className="input-field" />
                <button type="button" onClick={() => setFilters({
                    startDate: '',
                    endDate: '',
                    transactionType: '',
                    category: ''
                })} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                <GrPowerReset />
                </button>
                
            </form>
            {transactions.length > 0 &&
                  <CSVLink data={exportCSV()} filename="transactions.csv">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md  hover:bg-blue-600 transition duration-300"><FaDownload />
                    </button>
                  </CSVLink>
                }


            {loading ? (
                <p>Loading...</p>
            ) : transactions.length > 0 ? ( 
                <table className="w-full border-collapse border ">
                    <thead>
                        <tr className="bg-gray-200 ">
                            <th className="px-4 py-2 border-gray-500">Description</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction._id}>
                                <td className="border px-4 py-2 border-gray-800">{transaction.description}</td>
                                <td className="border px-4 py-2">₹ {transaction.amount}</td>
                                <td className="border px-4 py-2">{transaction.type}</td>
                                <td className="border px-4 py-2">{transaction.category}</td>
                                <td className="border px-4 py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-gray-600">No transactions to show.</div>
            )}
        </div>
    );
};

export default FilterTransactionList;
