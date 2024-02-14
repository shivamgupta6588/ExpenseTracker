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

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/add-transaction' element={<AddTransaction />} />
          <Route path='/get-transaction' element={<TransactionList />} />
          <Route path='/update-transaction/:id' element={<UpdateTransaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
