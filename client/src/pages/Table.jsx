import React from 'react'

const Table = ({transactions}) => {
  return (
    <div>
        <table className="w-full border-collapse border mt-4">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Type</th>
                                <th className="px-4 py-2">Category</th>
                                <th className="px-4 py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction._id}>
                                    <td className="border px-4 py-2">{transaction.description}</td>
                                    <td className="border px-4 py-2">₹ {transaction.amount}</td>
                                    <td className="border px-4 py-2">{transaction.type}</td>
                                    <td className="border px-4 py-2">{transaction.category}</td>
                                    <td className="border px-4 py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    </div>
  )
}

export default Table