import React from 'react'
import Complaint from './Complaint'


function User() {

  return (
    <>
    <div className='mt-8 ml-64 font-bold text-3xl'>Hi {localStorage.getItem("userName").toUpperCase()} !</div>
    <Complaint/>
    </>
  )
}

export default User