import "./WeatherCard.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
    <div className="main">
      <div className="top">
        <p className="header">{weatherCardData.name}</p>
        <Button
          className="button"
          inverted
          color="blue"
          circular
          icon="refresh"
          onClick={refresh}
        />
      </div>
      <div className="flex">
        <p className="day">
          {moment().format("dddd")}, <span>{moment().format("LL")}</span>
        </p>
        <p className="description">{weatherCardData.description}</p>
      </div>

      <div className="flex">
        <p className="temp">Temperature: {weatherCardData.temperature} &deg;C</p>
        <p className="temp">Humidity: {weatherCardData.humidity} %</p>
      </div>

      <div className="flex">
        <p className="sunrise-sunset">
          Sunrise:{" "}
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-IN")}
        </p>
        <p className="sunrise-sunset">
          Sunset:{" "}
          {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
