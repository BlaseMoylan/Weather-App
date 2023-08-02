import "./WeatherCard.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import breezeIcon from "../../assets/breezeIcon.png"
import moment from "moment";
import { Button } from "semantic-ui-react";

/**
 * WeatherCard component displays weather information.
 * @param {Object} weatherData - Weather data object containing weather details.
 * @returns {JSX.Element} WeatherCard component JSX.
 */

const WeatherCard = ({ weatherData }) => {
  const refresh = () => {
    window.location.reload();
  };

  // State to store weather data
  const [weatherCardData, setWeatherCardData] = useState({
    temperature: "",
    city: "",
    description: "",
    name: "",
    humidity: "",
    visibility: "",
    windSpeed: "",
    wicon: "",
  });

  // Fetch weather data when the component is mounted or weatherData prop changes
  useEffect(() => {
    setWeatherCardData(weatherData);
  }, [weatherData]);

  // Fetch Weather Data from Open Weather API
  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${weatherCardData.city}&appid=e203317f0df5474c05874e35b030eda3`
      );
      const { main, weather, name, visibility, wind } = response.data;
      setWeatherCardData({
        temperature: Math.round(main.temp - 273.15),
        description: weather[0].description,
        name,
        humidity: main.humidity,
        visibility: visibility / 1000,
        windSpeed: wind.speed,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="weather">
        <div className="top">
            <div>
                <p className="city">{weatherData.name}</p>
                <p className="weather-description">{weatherData.weather[0].description}</p>
            </div>
            {/* We need to find some delightful icons to put into this section. I found some free ones here https://www.iconfinder.com/weather-icons?price=free  */}
            {/* <img alt="weather" className="weather-icon" src={`icons/${weatherData.weather[0].icon}.png`} /> */}
            <img alt="weather" className="weather-icon" src={breezeIcon} />
        </div>
        <div className="bottom">
            <p className="temperature">{Math.round(weatherData.main.temp)}°F</p>
            <div className="details">
                <div className="parameter-row">
                    <span className="parameter-label">Details</span>
                </div>
                <div className="parameter-row">
                    <span className="parameter-label">Feels like</span>
                    <span className="parameter-value">{Math.round(weatherData.main.feels_like)}°F</span>
                </div>
                <div className="parameter-row">
                    <span className="parameter-label">Wind</span>
                    <span className="parameter-value">{weatherData.wind.speed} mph</span>
                </div>
                <div className="parameter-row">
                    <span className="parameter-label">Humidity</span>
                    <span className="parameter-value">{weatherData.main.humidity}%</span>
                </div>
                <div className="parameter-row">
                    <span className="parameter-label">Pressure</span>
                    <span className="parameter-value">{weatherData.main.pressure} hPa</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WeatherCard;
