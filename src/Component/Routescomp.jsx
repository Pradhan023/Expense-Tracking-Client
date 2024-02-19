import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Heropage from './Heropage'
import Layout from '../Layout/Layout'

const Routescomp = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<Heropage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/expensetracker' element={<Layout/>} />
    </Routes>
    </div>
  )
}

export default Routescomp