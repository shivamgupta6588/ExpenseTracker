import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Expense Tracker</h1>
      <Link to="/add-transaction" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
        Add Transaction
      </Link>
    </div>
  );
};

export default Home;
