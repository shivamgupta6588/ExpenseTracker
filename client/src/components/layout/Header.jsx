import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-700 text-white py-4 px-8  ">
      <div className=" mx-auto flex gap-2   max-sm:flex-col flex-wrap justify-between items-center">
        <Link to="/"><h1 className="text-2xl font-bold">Expenses Website</h1></Link>
        <div className="flex items-center gap-2 flex-wrap">
          <Link to="/" className="text-gray-200 hover:text-white">Home</Link>
          <Link to="/about" className="text-gray-200 hover:text-white">  </Link>
          <Link to="/sign-in" className="text-gray-200 hover:text-white">Sign In</Link>
          <Link to="/sign-up" className="text-gray-200 hover:text-white">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
