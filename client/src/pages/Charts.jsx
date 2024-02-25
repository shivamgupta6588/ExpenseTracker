import React from 'react';
import { Chart } from 'primereact/chart';

const Charts = ({ transactions }) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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

  // Create data for bar chart
  const barChartData = {
    labels: transformedData.map(data => data.date),
    datasets: [
      {
        label: 'Income (₹)',
        backgroundColor: '#9c6936',
        data: transformedData.map(data => data.income)
      },
      {
        label: 'Expense (₹)',
        backgroundColor: '#c6905a',
        data: transformedData.map(data => data.expense)
      }
    ]
  };

  // Calculate total income and expenses
  const totalIncome = transformedData.reduce((total, data) => total + data.income, 0);
  const totalExpense = transformedData.reduce((total, data) => total + data.expense, 0);

  // Calculate percentage of total income and expenses
  const incomePercentage = (totalIncome / (totalIncome + totalExpense)) * 100;
  const expensePercentage = (totalExpense / (totalIncome + totalExpense)) * 100;

  return (
    <div className="flex flex-row max-sm:flex-col lg:justify-center gap-3  lg:p-3 items-center flex-wrap max-w-[100%] ">
      <Chart type="bar" data={barChartData} style={{ width: '100%' }} className="border bg-[#ffebcc] rounded-lg" />
      <div className="mt-4 flex flex-col gap-4 items-center">
        <div className="flex justify-between gap-3 max-sm:flex-col  flex-1">
          <div className="bg-green-100 p-4 rounded-md flex-1/2">
            <p className="text-lg font-semibold">Total Income</p>
            <p className="text-2xl font-bold">₹ {totalIncome.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            <p>Income Percentage: {incomePercentage.toFixed(2)}%</p>
          </div>
          <div className="bg-red-100 p-4 rounded-md flex-1/2">
            <p className="text-lg font-semibold">Total Expenses</p>
            <p className="text-2xl font-bold">₹ {totalExpense.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            <p>Expense Percentage: {expensePercentage.toFixed(2)}%</p>
          </div>
        </div>
        <div className="bg-orange-400 p-4 rounded-md flex-1">
          <p className="text-lg font-semibold">Total Balance</p>
          <p className="text-2xl font-bold">₹ {totalExpense > totalIncome ? numberWithCommas(-(totalExpense - totalIncome)) : numberWithCommas(Math.abs(totalExpense - totalIncome))}</p>
        </div>
      </div>
    </div>
  );
};

export default Charts;
