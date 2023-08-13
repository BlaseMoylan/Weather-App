// this will be on a set default to the current accounts home location (this funtionality is not configured yet)
// this will also be used by the search funtionality ( i am currently working on this )


// Takes in location
    // figure out how to get 4 day forecast ( i am currently working on this )
    // I will actualy be taking in the lat and long which is being held in app.js

// make a call for the 4 day forecast
    // I found this for a 5 day forecast:
        // "https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid={yourAPIKey}"
        // this does not take lat and long just the city name
        // there is also this:
        // https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// < this is all in the return
// sends in each days info to the card component
    // maping over each day and returning the custom card for that
// displays each day >

import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./WeatherDisplay.css"
import WeatherCard from "../WeatherCard/WeatherCard";
import WeatherCurrCard from "../WeatherCard/WeatherCurrCard";

export default function WeatherDisplay({lat,long}){
    // the default useState will need to be set to the home location of the account ( I will work on this later )
    //
    const [todayData, setTodayData]= useState(null)
    const [forecastdata, setForecastData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // need to get current Day separetly
    const [currDay,setCurrDay]=useState([])
    // in the list that is returned there is 40 items: 8 per day - 5days
    // option1:
      // set each day to a list of the 8 hours in each day
    // option2:
      // consolidate the hours data into the data that is desired for each day
        // so that each day is set to a dictionary of wanted data set to that days forecasted data
    // might need to do option two anyway

    // need to figure out how to map this inorder to get the above outcomes
      // mostly figured that out - now trying to find the best way to get the info condensed even more
        // into a ditionary showing the overall info for each day
    const [day1,setDay1]=useState()
    const [day2,setDay2]=useState()
    const [day3,setDay3]=useState()
    const [day4,setDay4]=useState()

    useEffect(() => {
      fetchCurrentData()
      fetchForcastedData()
    }, [lat,long]);

    const fetchCurrentData = async ()=>{
        if (lat && long) {
          // setIsLoading(true);
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
            );

            const result = response.data;
            setTodayData(result);

            // setTimeout(() => {
            //   setIsLoading(false);
            // }, 1000); // Simulating a delay for demonstration purposes

          } catch (error) {
            console.error('Error fetching weather data:', error);
            setIsLoading(false);

          }
        }
    }

    const fetchForcastedData = async () => {
        if (lat && long) {
          setIsLoading(true);

          try {
            // this gets the next 5 days current day not included
            // this gives a forecast for every three hours each day - 8 hours forecasted each day
                    // so every 9th item in the list is the start of a new day
                // need to consolidate this data and get the overall max and min for each day
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/forecast?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
            );

            const result = response.data;
            setForecastData(result.list);

            setTimeout(() => {
              setIsLoading(false);
            }, 1000); // Simulating a delay for demonstration purposes

          } catch (error) {
            console.error('Error fetching weather data:', error);
            setIsLoading(false);

          }
        }
      };

      console.log(forecastdata)

    const getDate=(dt_txt)=>dt_txt.split(' ')[0]
    useEffect(()=>{
      if(forecastdata !==null){
        const groupedDataByDay=forecastdata.reduce((result, item)=>{
          const day= getDate(item.dt_txt)
          if (!result[day]) {
            result[day] = [];
          }
          result[day].push(item);
          return result;
        }, {});

        // each array in this array is an array of the hours for that day
        const groupedDataArray = Object.values(groupedDataByDay);
        console.log(groupedDataArray)
        const forecastedDays=groupedDataArray.filter(item => item.length == 8)
        // this is now the useable days (days with a complete forecast)
        // need to iterate over this inorder to get the info per day that we want
        console.log(forecastedDays)
        console.log(forecastedDays[0])
        // I am getting a render problem here
        setDay1(forecastedDays[0])
        setDay2(forecastedDays[1])
        setDay3(forecastedDays[2])
        setDay4(forecastedDays[3])
      }
    },[forecastdata])
    // want to get it so that these functions are condensed into one ( only if it does not make it a confusing mess!!!)
    function getTemperatureStats(weatherData){
      return weatherData.reduce(
        (acc, curr)=>{
          const minTemp=curr.main.temp_min
          const maxTemp=curr.main.temp_max

          if(minTemp<acc.minTemp){
            acc.minTemp=minTemp
          }

          if(maxTemp > acc.maxTemp){
            acc.maxTemp=maxTemp
          }

          return acc;
        },
        {
          minTemp:Infinity,
          maxTemp:-Infinity,
        }
      )
        
    }

    function getAverageHumidity(weatherData){
      if(weatherData.length===0){
        return 0;
      }

      const totalHumidity=weatherData.reduce((sum, data) => sum + data.main.humidity, 0)
      const averageHumidity=totalHumidity/weatherData.length;
      return averageHumidity
    }

    function getMostCommonWeatherDescription(weatherData){
      if(weatherData.length===0){
        return "No Data available"
      }

      const weatherDescriptionCounts = weatherData.reduce((counts, data)=> {
        const description= data.weather[0].description
        counts[description]=(counts[description] || 0) +1
      },{})

      let mostCommonDescription =""
      let highestCount =0

      for(const description in weatherDescriptionCounts){
        if(weatherDescriptionCounts[description]> highestCount){
          mostCommonDescription=description
          highestCount=weatherDescriptionCounts[description]
        }
      }

      return mostCommonDescription
    }

    return (
        <div>
          <div className="today">
            <WeatherCurrCard data={todayData}/>
          </div>
          <div className="forecasted">  
          {/* look into mapping over the card component */}
          {/* the card component still needs to be made and imported for this to work!!! */}
            <WeatherCard minMax={getTemperatureStats(day1)} averageHumidity={getAverageHumidity(day1)} weatherDescription={getMostCommonWeatherDescription(day1)} date={day1[0].data.dt_txt.split(" ")[0]}/>
            <WeatherCard minMax={getTemperatureStats(day2)} averageHumidity={getAverageHumidity(day2)} weatherDescription={getMostCommonWeatherDescription(day2)} date={day2[0].data.dt_txt.split(" ")[0]}/>
            <WeatherCard minMax={getTemperatureStats(day3)} averageHumidity={getAverageHumidity(day3)} weatherDescription={getMostCommonWeatherDescription(day3)} date={day3[0].data.dt_txt.split(" ")[0]}/>
            <WeatherCard minMax={getTemperatureStats(day4)} averageHumidity={getAverageHumidity(day4)} weatherDescription={getMostCommonWeatherDescription(day4)} date={day4[0].data.dt_txt.split(" ")[0]}/>
          </div>
        </div>
    )
}
