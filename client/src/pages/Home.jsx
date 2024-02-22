import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import FilterTransactionList from "./FilterTransactionList.jsx";

const Home = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <div className="m-4 flex flex-col">
      <h1 className="text-3xl font-bold mb-8 ">Welcome to Expense Tracker</h1>
      {currentUser?(
      <div className="flex flex-col gap-3  items-center justify-around">
        <span className="flex gap-3 items-center max-sm:flex-col">
              <Link to="/add-transaction" className="bg-[#9c6936] text-white px-4 py-2 rounded-md hover:bg-[#bf8c47] transition duration-300">
                Add Transaction
              </Link>
              <Link to="/get-transaction" className="bg-[#9c6936] text-white px-4 py-2 rounded-md hover:bg-[#bf8c47] transition duration-300">
                Get Transactions
              </Link>
        </span>
      <FilterTransactionList/>
      </div>):(<Link to="/sign-in">
        <div>Please Login to experience the app</div>
        </Link>)}
    </div>
  );
};

export default Home;
