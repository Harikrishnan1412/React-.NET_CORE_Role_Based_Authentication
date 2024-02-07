import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Secret from './components/Secret'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar/>
      <ToastContainer />
      <Routes>
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/Login' element={<LoginForm />} />
        <Route path='/' element={<Home />} />
        <Route path='/secret' element={<Secret/>}/>
      </Routes>
    </>
  );
}

export default App;
