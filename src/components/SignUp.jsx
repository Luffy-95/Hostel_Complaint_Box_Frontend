import React from 'react'
import nitpLogo from '../resources/nitp logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import {handleError,handleSuccess} from '../Utils/Utilities'

function SignUp() {

    const [signUpInfo,setSignUpInfo] = useState({
      name : "",
      email : "",
      password: ""
    });

    const [flag,setFlag] = useState(false);

    const navigate = useNavigate();

    const handleSignUp = async(e) => {
      e.preventDefault();
      const {name,email,password} = signUpInfo;

      if(!name || !email || !password){
        return handleError("name,email and password are required");
      }
      try{
        const url = "https://hostel-complaint-box.onrender.com/auth/signup";
        const response = await fetch(url,{
          method : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(signUpInfo)
        })
        const result = await response.json();
        const {success,message,error} = result;
        if(success){
          handleSuccess(message);
          setTimeout(() =>{
            navigate("/login");
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
      const copySignUpInfo = {...signUpInfo};
      copySignUpInfo[name] = value;
      setSignUpInfo(copySignUpInfo);
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
                <p className="text-gray-500">Please sign-up to create your account</p>
              </div>
              <form onSubmit={handleSignUp}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    onChange={handleChange}
                    name="name"
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    name="email"
                    onChange={handleChange}
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
                    name="password"
                    onChange={handleChange}
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
                >
                  SIGN UP
                </button>
              </form>
              
            </div>
          </div>
          <ToastContainer/>
        </div>
      )
}

export default SignUp