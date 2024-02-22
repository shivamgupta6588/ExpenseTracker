import React, { useState } from 'react';

const Table = ({ transactions }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  return (
    <div>
      <table className="w-full mt-4">
        <thead>
          <tr className="bg-[#9c6936] text-gray-200">
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('date')}>
              Date {sortConfig.key === 'date' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('type')}>
              Type {sortConfig.key === 'type' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('description')}>
              Description {sortConfig.key === 'description' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('amount')}>
              Amount {sortConfig.key === 'amount' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('category')}>
              Category {sortConfig.key === 'category' && (
                sortConfig.direction === 'ascending' ? '▲' : '▼'
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map(transaction => (
            <tr key={transaction._id}>
              <td className="border px-4 py-2">{formatDate(transaction.date)}</td>
              <td className="border px-4 py-2">{transaction.type}</td>
              <td className="border px-4 py-2">{transaction.description}</td>
              <td className="border px-4 py-2">₹ {transaction.amount}</td>
              <td className="border px-4 py-2">{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
