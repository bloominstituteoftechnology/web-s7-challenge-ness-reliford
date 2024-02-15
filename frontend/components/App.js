import React, { useState, useEffect } from 'react'
import Home from './Home'
import Form from './Form'
import { NavLink, Routes, Route } from 'react-router-dom'




function App() {

  
  return (
    <div id="app">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/order">Order</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/order" element={<Form/>}></Route>
      </Routes>
    </div>
  )
}

export default App
