import './App.css';
import React, { useEffect, useState } from 'react';
import Weather from './components/weather';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (lat && long) {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      );
      const result = await response.json();

      setTimeout(() => {
        setData(result);
        setIsLoading(false);
      }, 1000); // Simulating a delay for demonstration purposes
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

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