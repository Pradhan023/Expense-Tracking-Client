import React from 'react'
import Heropage from './Component/Heropage'
import Header from './Component/Header'
import Layout from './Layout/Layout'
import Routescomp from './Component/Routescomp'
import Footer from './Component/Footer'

const App = () => {
  const token = localStorage.getItem("token")
  return (
    <>
    <Header/>
    <Routescomp/>
    <Footer/>
    </>
  )
}

export default App