import { Routes, Route, Navigate } from 'react-router-dom';


import HomePage from './pages/HomePage';

import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import ForgotPassword from './components/Authentication/ForgotPassword/ForgotPassword';
import './App.scss';

/**
 * App component renders the weather information based on the user's location.
 * It retrieves weather data using the OpenWeatherMap API.
 * @returns {JSX.Element} App component JSX.
 */

export default function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotpassword' element={ <ForgotPassword/> } />
        <Route path='/resetpassword/:resetCode' />
        <Route path="/*" element={<Navigate to="/home" replace={true}/>} />
      </Routes>
    </div>
  );
};