import React, { useEffect, useState } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
// import WeatherDisplay from '../components/WeatherDisplay/WeatherDisplay';
// import WeatherCard from '../components/WeatherCard/WeatherCard';

const HomePage = () => {

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

          const result = response.data;
          setData(result);

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
        <div>
            {isLoading ? (
                <div className="loading-container">
                <Dimmer active>
                    <Loader>Loading..</Loader>
                </Dimmer>
                </div>
            ) : (
                <div>
                <Navbar setLong={setLong} setLat={setLat} />
                <main>
                    {/* <WeatherDisplay lat={lat} long={long} />
                    <WeatherCard weatherData={data} /> */}
                </main>
                </div>
            )}
        </div>
    );
}

export default HomePage;