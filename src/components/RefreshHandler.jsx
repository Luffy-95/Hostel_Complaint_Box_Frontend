import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setIsAuthenticated}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            setIsAuthenticated(true);
            if(location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/admin" || location.pathname === "/user"){
                if((localStorage.getItem("isAdmin")) === "true"){
                    navigate("/admin")
                }else if((localStorage.getItem("isAdmin")) === "false"){
                    navigate("/user")
                }
            }
        }
    },[location.pathname,navigate,setIsAuthenticated])

  return null;
  
}

export default RefreshHandler