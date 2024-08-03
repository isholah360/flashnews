import { useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './component/header/heade'
import Navbar from './component/header/navbar'
import Footer from './component/footer/footer'

function App() {
 

  return (
    <>
      <Header/>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
