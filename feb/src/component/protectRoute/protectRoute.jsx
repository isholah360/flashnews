import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectRoute() {
const {userInfo} = useSelector(state => state.user);

  return userInfo ? <Outlet/> : <Navigate to="/login" replace/>
}




export default ProtectRoute