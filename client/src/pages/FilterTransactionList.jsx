import { useState, useEffect } from 'react';
import axios from 'axios';
import { GrPowerReset } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import { FaDownload } from "react-icons/fa";
import Charts from './Charts';
import CategoryCharts from './CategoryCharts';
import Table from './Table';
import { FaFilter } from "react-icons/fa";


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
        <div className="max-w-3xl mx-auto p-6 border bg-[#ffdc99] rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-orange-800 mb-4 flex-row flex"><FaFilter />Filter</h2>
            <form className="flex flex-wrap  max-sm:flex-col  gap-4 mb-4">
                <input  type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="border rounded-lg px-4 py-2 text-base text-gray-700 bg-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500" />
                <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="border rounded-lg px-4 py-2 text-base text-gray-700 bg-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500" />
                <select name="transactionType" value={filters.transactionType} onChange={handleFilterChange} className="border rounded-lg px-4 py-2 text-base text-gray-700 bg-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <input type="text" name="category" value={filters.category} onChange={handleFilterChange} placeholder="Category" 
                className="border rounded-lg px-4 py-2 text-base text-gray-700 bg-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500" />
                <button type="button" onClick={() => setFilters({
                    startDate: '',
                    endDate: '',
                    transactionType: '',
                    category: ''
                })} className=" bg-orange-800 px-4 text-white py-2 rounded-md flex items-center justify-center max-sm:max-w-[60px]">
                    <GrPowerReset />
                </button>
            </form>
            {transactions.length > 0 && (
                <CSVLink data={exportCSV()} filename="transactions.csv">
                    <button className="bg-orange-800 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 flex items-center justify-center max-sm:max-w-[60px]">
                        <FaDownload /> 
                    </button>
                </CSVLink>
            )}
            {loading ? (
                <p>Loading...</p>
            ) : transactions.length > 0 ? ( 
                <>
                    <p className='max-sm:hidden'><Table transactions={transactions}/></p>
                    <div className="mt-4 flex flex-col gap-3">
                        <Charts transactions={transactions}/>
                        <CategoryCharts  transactions={transactions}/>
                    </div>
                </>
            ) : (
                <div className="text-gray-600">No transactions to show.</div>
            )}
        </div>
    );
};

export default FilterTransactionList;
