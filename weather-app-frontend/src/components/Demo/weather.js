// import React from 'react';
// import './styles.css';
// import moment from 'moment';
// import { Button } from 'semantic-ui-react';


// // may add this const to the parent and pass it down through the props
// const refresh = () => {
//   window.location.reload();
// }

// /**
//  * WeatherCard component displays weather information.
//  * @param {Object} weatherData - Weather data object containing weather details.
//  * @returns {JSX.Element} WeatherCard component JSX.
//  */

// const WeatherCard = ({weatherData}) => (
//   <div className="main">

//       <div className="top">
//         <p className="header">{weatherData.name}</p>
//         <Button className="button" inverted color='blue' circular icon='refresh' onClick={refresh} />
//       </div>
//       <div className="flex">
//         <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
//         <p className="description">{weatherData.weather[0].main}</p>
//       </div>

//       <div className="flex">
//         <p className="temp">Temprature: {weatherData.main.temp} &deg;F</p>
//         <p className="temp">Humidity: {weatherData.main.humidity} %</p>
//       </div>

//       <div className="flex">
//         <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
//         <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
//       </div>
    
//   </div>
// )

// export default WeatherCard;