import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { signOutUserStart, signOutSuccess, signOutUserFailure } from '../../../redux/user/userSlice.js';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const response = await axios.get('/api/users/signout');
      const data = response.data;
      console.log('Sign-out successful:', data.message);
      dispatch(signOutSuccess(data));
      navigate('/');
    } catch (error) {
      console.error('Error during sign-out:', error.message);
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <header className="bg-gray-700 text-white py-4 px-8">
      <div className="mx-auto flex gap-2 max-sm:flex-col flex-wrap justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">Expenses Website</h1>
        </Link>
        <div className="flex items-center gap-2 flex-wrap">
          <Link to="/" className="text-gray-200 hover:text-white">Home</Link>
          <Link to="/about" className="text-gray-200 hover:text-white">About</Link>
          {!currentUser ? (
            <>
              <Link to="/sign-in" className="text-gray-200 hover:text-white">Sign In</Link>
              <Link to="/sign-up" className="text-gray-200 hover:text-white">Sign Up</Link>
            </>
          ) : (
            <button onClick={handleSignOut}>Sign Out</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
