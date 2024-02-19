import { useState, useEffect } from 'react';
import axios from 'axios';
import { GrPowerReset } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import { FaDownload } from "react-icons/fa";
import Charts from './Charts';
import ExpensesCalendar from './ExpensesCalendar';
import Table from './Table';

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
                    params: filters 
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
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction List</h2>
            <form className="flex flex-wrap gap-4 mb-4">
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
            {transactions.length > 0 && (
                <CSVLink data={exportCSV()} filename="transactions.csv">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                        <FaDownload /> Download CSV
                    </button>
                </CSVLink>
            )}
            {loading ? (
                <p>Loading...</p>
            ) : transactions.length > 0 ? ( 
                <>
                    <Table transactions={transactions}/>
                    <div className="mt-4">
                        <Charts transactions={transactions}/>
                        <ExpensesCalendar  transactions={transactions}/>
                    </div>
                </>
            ) : (
                <div className="text-gray-600">No transactions to show.</div>
            )}
        </div>
    );
};

export default FilterTransactionList;
