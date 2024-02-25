import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/layout/Header.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from './pages/SignUp.jsx';
import AddTransaction from './pages/AddTransaction.jsx';
import TransactionList from './pages/TransactionList.jsx';
import UpdateTransaction from './pages/UpdateTransaction.jsx';
import PrivateRoute from './utils/PrivateRoute.jsx';
import ProfileManagement from './pages/ProfileManagement.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/add-transaction' element={<AddTransaction />} />
          <Route path='/get-transaction' element={<TransactionList />} />
          <Route path='/update-transaction/:id' element={<UpdateTransaction />} />
          <Route path='/update-user' element={<ProfileManagement/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
