import { Routes, Route, Navigate } from 'react-router-dom';


import HomePage from './pages/HomePage';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
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
        <Route path='/auth'>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgotpassword' />
          <Route path='/resetpassword /:resetCode' />
        </Route>
        <Route path="/*" element={<Navigate to="/home" replace={true}/>} />
      </Routes>
    </div>
  );
};