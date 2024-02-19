import { Calendar } from 'react-calendar';

const ExpensesCalendar = ({ transactions }) => {
  const totalExpensesByDay = {};

  transactions.forEach(transaction => {
    const date = new Date(transaction.date).toLocaleDateString();
    if (!totalExpensesByDay[date]) {
      totalExpensesByDay[date] = 0;
    }
    if (transaction.type === 'expense') {
      totalExpensesByDay[date] += transaction.amount;
    }
  });

  const tileContent = ({ date }) => {
    const formattedDate = date.toLocaleDateString();
    const totalExpenses = totalExpensesByDay[formattedDate] || 0;
    return totalExpenses > 0 ? (
      <p className="text-sm text-gray-600">₹ {totalExpenses}</p>
    ) : null;
  };

  const tileClassName = ({ date }) => {
    const formattedDate = date.toLocaleDateString();
    const totalExpenses = totalExpensesByDay[formattedDate] || 0;
    return totalExpenses > 0 ? 'bg-red-200' : '';
  };

  return (
    <div className="mx-auto max-w-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4">Expenses Calendar</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Calendar
          tileContent={tileContent}
          activeStartDate={new Date()}
          defaultView='month'
          tileClassName={tileClassName}
          locale="en-US"
        />
      </div>
    </div>
  );
};

export default ExpensesCalendar;
