import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/layout/Header.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from './pages/SignUp.jsx';
import AddTransaction from './pages/AddTransaction.jsx';
// import PrivateRoute from './utils/PrivateRoute.js';
// import {Outlet} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/'   element={<Home/>}/>
    {/* <Route element={<PrivateRoute/>}>  */}
          <Route path='/about' element={<About/>}/>
    {/* </Route> */}
      {/* <Route path="/about" element={<About />} /> */}
      <Route  path='/sign-in' element={<SignIn/>}/>
      <Route  path='/sign-up' element={<SignUp/>}/>
      <Route path="/add-transaction" element={<AddTransaction/>} />

    </Routes>
    {/* <Outlet/> */}
    </BrowserRouter>
  );
};

export default App;
