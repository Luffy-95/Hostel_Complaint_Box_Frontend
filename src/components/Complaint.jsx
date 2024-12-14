import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../Utils/Utilities";
import {ToastContainer} from 'react-toastify'

function Complaint() 
{
      const navigate = useNavigate();

      const [complaintData,setComplaintData] = useState({
        enrollNumber: "",
        roomNumber: "",
        description: ""
      })

      const handleChange = (e) => {
        const {name,value} = e.target;
        const copyComplaintData = {...complaintData};
        copyComplaintData[name] = value;
        setComplaintData(copyComplaintData);
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        const {enrollNumber,roomNumber,description} = complaintData;

        if(!enrollNumber || !roomNumber || !description){
          return handleError("All fields required");
        }

        try{
          const url = "https://hostel-complaint-box.onrender.com/userPage/addComplaint";
          const response = await fetch(url,{
            method : "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token")
            },

            body: JSON.stringify(complaintData)
          })
          const result = await response.json();
          const {success,message,error} = result;
          if(success){
            handleSuccess(message);
          }else if(error){
            const details = error?.details[0].message;
            handleError(details)
          }
        }catch(error){
          handleError(error)
        }
        
      }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <form onSubmit = {handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-3xl min-h-96">
          <div>
            <div className="mb-4 flex">
              <label
                htmlFor="enrollNumber"
                className="block text-gray-700 font-bold mb-2"
              >
                Enrollment Number:
              </label>
              <input
                onChange={handleChange}
                type="number"
                id="enrollNumber"
                name="enrollNumber"
                className="w-70 h-7 p-2 border border-gray-300 rounded ml-5"
              />
            </div>
            <div className="mb-4 flex">
              <label
                htmlFor="roomNumber"
                className="block text-gray-700 font-bold mb-2"
              >
                Room Number:
              </label>
              <input
                onChange={handleChange}
                type="number"
                id="roomNumber"
                name="roomNumber"
                className="w-70 h-7 p-2 border border-gray-300 rounded items-start ml-14 no-spinner"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Complaint Description:
            </label>
            <textarea
              onChange={handleChange}
              id="description"
              name="description"
              className="w-full p-2 border border-gray-300 rounded overflow-hidden h-80"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        <ToastContainer/>
      </div>
    );
}

export default Complaint;
