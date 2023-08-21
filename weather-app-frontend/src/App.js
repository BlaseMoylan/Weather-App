import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';

import HomePage from './pages/HomePage';

import Navbar from './components/Navbar/Navbar';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import ForgotPassword from './components/Authentication/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Authentication/ResetPassword/ResetPassword';
import './App.scss';

/**
 * App component renders the weather information based on the user's location.
 * It retrieves weather data using the OpenWeatherMap API.
 * @returns {JSX.Element} App component JSX.
 */

export default function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  return (
    <div className='app'>
      <Navbar setLat={setLatitude} setLong={setLongitude}/>
      <Routes>
        <Route path='/home' element={<HomePage latitude={latitude} longitude={longitude}/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forgotpassword' element={<ForgotPassword/>} />
        <Route path='/resetpassword/:resetCode' element={<ResetPassword/>} />
        <Route path="/*" element={<Navigate to="/home" replace={true}/>} />
      </Routes>
    </div>
  );
};