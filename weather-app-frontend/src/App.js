import './App.scss';
import React, { useEffect, useState } from 'react';
import Weather from './components/weather';
import { Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';

/**
 * App component renders the weather information based on the user's location.
 * It retrieves weather data using the OpenWeatherMap API.
 * @returns {JSX.Element} App component JSX.
 */
export default function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches weather data based on the user's location.
   * It makes a GET request to the OpenWeatherMap API using Axios.
   * If successful, sets the weather data and stops loading.
   * If there's an error, logs the error message.
   */
  const fetchData = async () => {
    if (lat && long) {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
        );
        console.log("dlahghalglaldflalsldkhglahl")
        const result = response.data;
        setData(result);
        console.log(data)
        console.log(data.name)
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Simulating a delay for demonstration purposes
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setIsLoading(false);
      }
    }
  };

  // Retrieves the user's current geolocation coordinates
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  // Fetches weather data when the latitude or longitude changes
  useEffect(() => {
    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      {isLoading ? (
        <div className="loading-container">
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      ) : (
        <Weather weatherData={data} />
      )}
    </div>
  );
}