// this will be on a set default to the current accounts home location (this funtionality is not configured yet)
// this will also be used by the search funtionality ( i am currently working on this )


import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./WeatherDisplay.css"
import WeatherCurrCard from "../WeatherCard/WeatherCurrCard"
import WeatherFutureCard from "../WeatherCard/WeatherFutureCard"

export default function WeatherDisplay({ lat, long }) {
    const [todayData, setTodayData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currDay, setCurrDay] = useState([]);
    const [day1, setDay1] = useState();
    const [day2, setDay2] = useState();
    const [day3, setDay3] = useState();
    const [day4, setDay4] = useState();

    useEffect(() => {
        // Fetch current weather data and forecasted data when latitude and longitude change
        fetchCurrentData();
        fetchForecastedData();
        setIsLoading(false)
    }, [lat, long]);

    const fetchCurrentData = async () => {
        if (lat && long) {
            try {
                // Fetch current weather data using OpenWeatherMap API
                // this gets the next 5 days current day not included
            // this gives a forecast for every three hours each day - 8 hours forecasted each day
                    // so every 9th item in the list is the start of a new day
                // need to consolidate this data and get the overall max and min for each day
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
                );

                const result = response.data;
                setTodayData(result);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }
    }

    const fetchForecastedData = async () => {
        if (lat && long) {
            setIsLoading(true);

            try {
                // Fetch forecasted weather data for the next 5 days using OpenWeatherMap API
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/forecast?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
                );

                const result = response.data;
                setForecastData(result.list);

                // Simulate a delay for demonstration purposes
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setIsLoading(false);
            }
        }
    };

    const getDate = (dt_txt) => dt_txt.split(' ')[0];

    useEffect(() => {
        if (forecastData !== null) {
            // Group forecasted data by day
            const groupedDataByDay = forecastData.reduce((result, item) => {
                const day = getDate(item.dt_txt);
                if (!result[day]) {
                    result[day] = [];
                }
                result[day].push(item);
                return result;
            }, {});

            const groupedDataArray = Object.values(groupedDataByDay);
            const forecastedDays = groupedDataArray.filter(item => item.length === 8);

            setDay1(forecastedDays[0]);
            setDay2(forecastedDays[1]);
            setDay3(forecastedDays[2]);
            setDay4(forecastedDays[3]);
        }
    }, [forecastData]);

    function getTemperatureStats(weatherData) {
        // Calculate minimum and maximum temperatures from forecasted data
        return weatherData.reduce(
            (acc, curr) => {
                const minTemp = curr.main.temp_min;
                const maxTemp = curr.main.temp_max;

                if (minTemp < acc.minTemp) {
                    acc.minTemp = minTemp;
                }

                if (maxTemp > acc.maxTemp) {
                    acc.maxTemp = maxTemp;
                }

          return acc;
        },
        {
          minTemp:Infinity,
          maxTemp:-Infinity,
        }
      )

    }

    function getAverageHumidity(weatherData) {
        if (weatherData.length === 0) {
            return 0;
        }

        // Calculate average humidity from forecasted data
        const totalHumidity = weatherData.reduce((sum, data) => sum + data.main.humidity, 0);
        const averageHumidity = totalHumidity / weatherData.length;
        return averageHumidity;
    }

    function getMostCommonWeatherDescription(weatherData) {
        if (weatherData.length === 0) {
            return "No Data available";
        }

        // Find the most common weather description from forecasted data
        const weatherDescriptionCounts = weatherData.reduce((counts, data) => {
            const description = data.weather[0].description;
            counts[description] = (counts[description] || 0) + 1;
            return counts;
        }, {});

        let mostCommonDescription = "";
        let highestCount = 0;

        for (const description in weatherDescriptionCounts) {
            if (weatherDescriptionCounts[description] > highestCount) {
                mostCommonDescription = description;
                highestCount = weatherDescriptionCounts[description];
            }
        }

        return mostCommonDescription;
    }

    return (
        <div className="mainDisplay">
            <div className="today">
                {/* Display current weather card */}
                {!isLoading && todayData != null ? <WeatherCurrCard data={todayData} />:null}
            </div>
            <div className="forecasted">
                {/* Display forecasted weather cards */}
                {/* look into mapping over the card component */}
                {!isLoading && day1 != null ? <WeatherFutureCard minMax={getTemperatureStats(day1)} averageHumidity={getAverageHumidity(day1)} weatherDescription={getMostCommonWeatherDescription(day1)} date={day1[0].dt_txt.split(" ")[0]} />:null}
                {!isLoading && day1 != null ?<WeatherFutureCard minMax={getTemperatureStats(day2)} averageHumidity={getAverageHumidity(day2)} weatherDescription={getMostCommonWeatherDescription(day2)} date={day2[0].dt_txt.split(" ")[0]} />:null}
                {!isLoading && day1 != null ?<WeatherFutureCard minMax={getTemperatureStats(day3)} averageHumidity={getAverageHumidity(day3)} weatherDescription={getMostCommonWeatherDescription(day3)} date={day3[0].dt_txt.split(" ")[0]} />:null}
                {!isLoading && day1 != null ?<WeatherFutureCard minMax={getTemperatureStats(day4)} averageHumidity={getAverageHumidity(day4)} weatherDescription={getMostCommonWeatherDescription(day4)} date={day4[0].dt_txt.split(" ")[0]} />:null}
            </div>
        </div>
    );
}

