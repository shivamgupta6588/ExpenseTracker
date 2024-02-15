import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import FilterTransactionList from "./FilterTransactionList.jsx";

const Home = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <div className="flex flex-col gap-3  items-center justify-around">
      <h1 className="text-3xl font-bold mb-8">Welcome to Expense Tracker</h1>
      {currentUser?(<>
      <Link to="/add-transaction" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-orange-600 transition duration-300">
        Add Transaction
      </Link>
      <Link to="/get-transaction" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
        Get Transactions
      </Link>
      <FilterTransactionList/>
      </>):(<Link to="/sign-in">
        <div>Please Login to experience the app</div>
        </Link>)}
    </div>
  );
};

export default Home;
