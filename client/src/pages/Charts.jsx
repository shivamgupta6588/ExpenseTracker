import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Charts = ({ transactions }) => {
  // Ensure transactions is not null or undefined
  if (!transactions || transactions.length === 0) {
    return <div>No data available for chart</div>;
  }

  // Aggregate data by date and type (income or expense)
  const aggregatedData = transactions.reduce((result, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    const type = transaction.type;
    if (!result[date]) {
      result[date] = { date, income: 0, expense: 0 };
    }
    result[date][type] += transaction.amount;
    return result;
  }, {});

  // Transform the aggregated data into an array
  const transformedData = Object.values(aggregatedData);

  // Calculate total income and expenses
  const totalIncome = transformedData.reduce((total, data) => total + data.income, 0);
  const totalExpense = transformedData.reduce((total, data) => total + data.expense, 0);

  // Calculate percentage of total income and expenses
  const incomePercentage = (totalIncome / (totalIncome + totalExpense)) * 100;
  const expensePercentage = (totalExpense / (totalIncome + totalExpense)) * 100;

  // Pie chart data
  const pieData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expense', value: totalExpense }
  ];

  // Colors for the pie chart
  const colors = ['#5ECC62', '#FF6262'];

  const [selectedTab, setSelectedTab] = useState('bar');
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <div>
      <div className="flex justify-center items-center my-4">
        <button onClick={() => setSelectedTab('bar')} className={`mr-4 px-4 py-2 rounded-md focus:outline-none ${selectedTab === 'bar' ?' text-white bg-orange-800': 'bg-[#9c6936] text-white' }`}>Bar Chart</button>
        <button onClick={() => setSelectedTab('pie')} className={`px-4 py-2 rounded-md focus:outline-none ${selectedTab === 'pie' ? 'text-white bg-orange-800':'bg-[#9c6936] text-white'}`}>Pie Chart</button>
      </div>
      {selectedTab === 'bar' ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={transformedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" stackId="a" fill="#5ECC62" name="Income" />
            <Bar dataKey="expense" stackId="a" fill="#FF6262" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
      <div className="mt-4 flex flex-col gap-4 items-center">
        <div className="flex justify-between gap-3 max-sm:flex-col  flex-1">
          <div className="bg-green-100 p-4 rounded-md flex-1/2">
            <p className="text-lg font-semibold">Total Income</p>
            <p className="text-2xl font-bold">₹ {totalIncome.toLocaleString('en-US', {maximumFractionDigits:2})}</p>
            <p>Income Percentage: {incomePercentage.toFixed(2)}%</p>
          </div>
          <div className="bg-red-100 p-4 rounded-md flex-1/2">
            <p className="text-lg font-semibold">Total Expenses</p>
            <p className="text-2xl font-bold">₹ {totalExpense.toLocaleString('en-US', {maximumFractionDigits:2})}</p>
            <p>Expense Percentage: {expensePercentage.toFixed(2)}%</p>
          </div>
          
        </div>
        <div className="bg-orange-400 p-4 rounded-md flex-1">
            <p className="text-lg font-semibold">Total Balance</p>
            <p className="text-2xl font-bold">₹ {totalExpense>totalIncome? numberWithCommas(-(totalExpense-totalIncome)):numberWithCommas(Math.abs(totalExpense-totalIncome))}</p>
          </div>
      </div>
    </div>
  );
};

export default Charts;
