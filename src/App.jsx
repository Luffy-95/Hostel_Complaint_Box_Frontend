import "./App.css";
import User from "./components/User.jsx";
import Login from "./components/Login.jsx";
import Admin from './components/Admin.jsx';
import Home from "./components/Home.jsx";
import SignUp from "./components/SignUp.jsx";
import RefreshHandler from "./components/RefreshHandler.jsx";
import { Routes,Route ,Navigate} from "react-router-dom";
import Nav from "./components/Nav.jsx";


import { useState } from "react";

function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/login"/>
  }

  const AdminRouter = ({element}) => {
    return (isAuthenticated && (Boolean(localStorage.getItem("isAdmin")) === true)) ? element : <Navigate to="/login"/>
  }

  return (
    <>
      <RefreshHandler setIsAuthenticated = {setIsAuthenticated}/>
      <Nav isAuthenticated = {isAuthenticated} setIsAuthenticated = {setIsAuthenticated}/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin' element={<AdminRouter element={<Admin/>}/>}/>
          <Route path='/user' element={<PrivateRoute element={<User/>}/>}/>
      </Routes>
    </>
  );
}

export default App;
