import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Home = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Welcome to Expense Tracker</h1>
      {currentUser &&(<>
      <Link to="/add-transaction" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600 transition duration-300">
        Add Transaction
      </Link>
      <Link to="/get-transaction" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
        Get Transaction
      </Link>
      </>)}
    </div>
  );
};

export default Home;
