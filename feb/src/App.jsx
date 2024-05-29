import { useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './component/header/heade'
import Navbar from './component/header/navbar'

function App() {
 

  return (
    <>
      <Header/>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App
