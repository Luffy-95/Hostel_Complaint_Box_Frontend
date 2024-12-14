import React from 'react'
import { useState ,useEffect} from 'react';
import { handleError ,handleSuccess} from '../Utils/Utilities';
import { ToastContainer} from 'react-toastify'


function Admin() {
  const [complaints, setComplaints] = useState([]);

  const fetchData = async () => {
    try{
      const url = "https://hostel-complaint-box.onrender.com/adminPage/getComplains";
      const response = await fetch(url,{
        method : "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization : localStorage.getItem("token")
        },
      })
      const result = await response.json();
      setComplaints(result);
    }catch(err){
      handleError(err)
    }
  }

  useEffect(() => {
    fetchData();
  },[])
  
  const deleteComplaint = async (index) => {
    try{
      const url = `https://hostel-complaint-box.onrender.com/adminPage/resolved/${index}`;
      const response = await fetch(url,{
        method : "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization : localStorage.getItem("token")
        },
    
      })
      
      const result = await response.json();

      const {success} = result;
      
      if(success){
        handleSuccess("Complaint Deleted Successfully"); 
      }
    }catch(err){
      handleError(err)
    }
  }

  const handleResolve = async (index) => {
    const updatedComplaints = complaints.filter((complaint) => 
      (complaint._id !== index)
    );
    setComplaints(updatedComplaints);
    deleteComplaint(index);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Complaints List</h2>
      <div className="space-y-4">
        {complaints.map((complaint) => (
          <div 
            key={complaint._id} 
            className={`p-4 border rounded-lg bg-white shadow-md ${complaint.resolved ? 'opacity-50' : ''}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Enrollment Number: {complaint.enrollNumber}
                </h3>
                <p className="text-sm text-gray-600">
                  Room Number: {complaint.roomNumber}
                </p>
              </div>
              {!complaint.resolved && (
                <button
                  onClick={() => handleResolve(complaint._id)}
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
            <p className="mt-3 text-gray-700 opacity-75">{complaint.description}</p>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Admin