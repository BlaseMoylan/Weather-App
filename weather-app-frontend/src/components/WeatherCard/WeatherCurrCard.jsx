import "./WeatherCard.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import breezeIcon from "../../assets/breezeIcon.png"
import moment from "moment";
import { Button } from "semantic-ui-react";



const WeatherCurrCard = ({ data }) => {
  const refresh = () => {
    window.location.reload();
  };

  // State to store weather data
  const [weatherCardData, setWeatherCardData] = useState({
    temperature: data.main.temp,
    city: data.name,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    visibility: data.visibility/1000,
    windSpeed: data.wind.speed,
    feelsLike: data.main.feels_like
    // this is the Icons
    // wicon: "",
  });



  return (
    <div className="weather">
        <div className="top">
            <div>
                <p className="city">{weatherCardData.city}</p>
                <p className="weather-description">{weatherCardData.description}</p>
            </div>
            {/* We need to find some delightful icons to put into this section. I found some free ones here https://www.iconfinder.com/weather-icons?price=free  */}
            {/* <img alt="weather" className="weather-icon" src={`icons/${weatherCardData.weather[0].icon}.png`} /> */}
            <img alt="weather" className="weather-icon" src={breezeIcon} />
        </div>
        <div className="bottom">
            <p className="temperature">{Math.round(weatherCardData.temperature)}°F</p>
            <div className="details">
                <div className="parameter-row">
                    <span className="parameter-label">Details</span>
                </div>
                <div className="parameter-row">
                    <span className="parameter-label">Feels like</span>
                    <span className="parameter-value">{Math.round(weatherCardData.feelsLike)}°F</span>
                </div>
                <div className="parameter-row">
                    <span className="parameter-label">Wind</span>
                    <span className="parameter-value">{weatherCardData.windSpeed} mph</span>
                </div>
                <div className="parameter-row">
                    <span className="parameter-label">Humidity</span>
                    <span className="parameter-value">{weatherCardData.humidity}%</span>
                </div>
                <div className="parameter-row">
                    <span className="parameter-label">Visibility</span>
                    <span className="parameter-value">{weatherCardData.visibility} mi</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WeatherCurrCard;
