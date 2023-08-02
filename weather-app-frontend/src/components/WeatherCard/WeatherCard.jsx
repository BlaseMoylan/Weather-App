import "./WeatherCard.css";
import React, {useState} from "react";
import axios from "axios";

const WeatherCard = () => {
    const [weatherData, setWeatherData] = useState({
      temperature: "",
      city: "",
      description: "",
      name: "",
      humidity: "",
      visibility: "",
      windSpeed: "",
      wicon: "",
    });
  
    useEffect(() => {
      getWeatherData();
    }, []);
  
    const getWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${weatherData.city}&appid=e203317f0df5474c05874e35b030eda3`
        );
        const { main, weather, name, visibility, wind } = response.data;
        setWeatherData({
          temperature: Math.round(main.temp - 273.15),
          description: weather[0].description,
          name,
          humidity: main.humidity,
          visibility: visibility / 1000,
          windSpeed: wind.speed,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
  
    return (
      <div
        onLoad={() => {
          getWeatherData(city);
        }}>
      </div>
    );
  };
  
  export default WeatherCard;
  