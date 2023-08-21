import React, { useEffect, useState } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import WeatherDisplay from '../components/WeatherDisplay/WeatherDisplay';

const HomePage = ({latitude, longitude}) => {

  const [lat, setLat] = useState(latitude);
  const [long, setLong] = useState(longitude);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLat(latitude)
    setLong(longitude)
  }, [latitude, longitude]);

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
        setIsLoading(false)

        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 1000); // Simulating a delay for demonstration purposes

      } catch (error) {
        console.error('Error fetching weather data:', error);
        setIsLoading(false);

      }
    }
  };

  // Retrieves the user's current geolocation coordinates
  useEffect(() => {
    if(!(lat && long)){
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    }
  }, []);

  // Fetches weather data when the latitude or longitude changes
  useEffect(() => {
    fetchData();
  }, [lat, long]);

  return (
      <div>
          {isLoading ? (
              <div className="loading-container">
              {/* <Dimmer active>
                  <Loader>Loading..</Loader>
              </Dimmer> */}
              </div>
          ) : (
              <div>
                <main>
                    <WeatherDisplay lat={lat} long={long} />
                </main>
              </div>
          )}
      </div>
  );
}

export default HomePage;