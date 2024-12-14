import React from 'react'
import nitpLogo from '../resources/nitp logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify'
import {handleError,handleSuccess} from '../Utils/Utilities'


function Login() {

  const [loginInfo,setLoginInfo] = useState({
    email : "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    const {email,password} = loginInfo;

    if(!email || !password){
      return handleError("Email and Password are required");
    }
    try{
      const url = "https://hostel-complaint-box.onrender.com/auth/login";
      const response = await fetch(url,{
        method : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginInfo)
      })
      const result = await response.json();
      const {message,success,jwtToken,name,isAdmin,error} = result;
      if(success){
        handleSuccess(message);
        localStorage.setItem("token",jwtToken);
        localStorage.setItem("userName",name);
        localStorage.setItem("isAdmin",isAdmin);

        setTimeout(() =>{
          if(Boolean(isAdmin) === true){
            navigate("/admin")
          }else{
            navigate("/user");
          }
        },1000)

      }else if(error){
        handleError("Email could not be verified")
      }else if(!success){
        handleError(message);
      }
    }catch(err){
      handleError(err)
    }
  }

  const handleChange = (e) => {
    const {name,value} = e.target;
    const copyLoginInfo = {...loginInfo};
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }
  
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        {/* Left Side Illustration */}
        <div className="w-1/2 bg-gray-800 flex flex-col justify-center items-center p-8">
          <div className="mb-6">
            <img
              src={nitpLogo}
              alt="Illustration"
              className="w-64 h-64"
            />
          </div>
          
        </div>

        {/* Right Side Login Form */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">Welcome to NIT Patna</h2>
            <p className="text-gray-500">Please sign-in to your account</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                onChange={handleChange}
                name="password"
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-sm text-yellow-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
            >
              LOGIN
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              New on our platform?{' '}
              <Link to="/signUp" className="text-purple-600 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
          
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Login