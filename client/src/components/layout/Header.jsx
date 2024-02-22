import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { signOutUserStart, signOutSuccess, signOutUserFailure } from '../../../redux/user/userSlice.js';
import { FaSignOutAlt,FaHome } from "react-icons/fa";
import { MdPerson } from "react-icons/md";


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
    <header className="bg-[#9c6936] text-white py-4 px-8">
      <div className="mx-auto flex gap-3 max-sm:flex-col flex-wrap justify-between items-center">
        <Link to="/about">
          <h1 className="text-2xl font-bold">Expenses Website</h1>
        </Link>
        <div className="flex items-center gap-2 flex-wrap max-sm:text-xs text-gray-200 hover:text-white">
          {currentUser&&
          <div className='flex items-center gap-1'>
          <MdPerson />
          <span className='uppercase'> {currentUser.name}</span>
          </div>}
          <Link to="/" className=" ">
          <span className='flex items-center justify-center max-sm:text-xs gap-1'><FaHome/> <span className='max-sm:hidden'>Home</span> </span>
          </Link>
          <Link to="/about" className="max-sm:hidden">About</Link>
          {!currentUser ? (
            <>
              <Link to="/sign-in" className="text-gray-200 hover:text-white">Sign In</Link>
              <Link to="/sign-up" className="text-gray-200 hover:text-white">Sign Up</Link>
            </>
          ) : (
            <button onClick={handleSignOut}><span className='flex items-center justify-center max-sm:text-xs gap-1'> <FaSignOutAlt /><span className='max-sm:hidden'>Sign Out</span> </span></button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
