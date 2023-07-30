// this will be on a set default to the current accounts home location (this funtionality is not configured yet)
// this will also be used by the search funtionality ( i am currently working on this )


// Takes in location
    // figure out how to get 4 day forcast ( i am currently working on this )
    // I will actualy be taking in the lat and long which is being held in app.js

// make a call for the 4 day forcast
    // I found this for a 5 day forcast:
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

export default function WeatherDisplay({lat,long}){
    // the default useState will need to be set to the home location of the account ( I will work on this later )
    //
    const [todayData, setTodayData]= useState(null)
    const [forcastdata, setForcastData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // need to get current Day separetly
    const [currDay,setCurrDay]=useState([])
    // in the list that is returned there is 40 items: 8 per day - 5days
    // option1:
      // set each day to a list of the 8 hours in each day
    // option2:
      // consolidate the hours data into the data that is desired for each day
        // so that each day is set to a dictionary of wanted data set to that days forcasted data
    // might need to do option two anyway

    // need to figure out how to map this inorder to get the above outcomes
      // mostly figured that out - now trying to find the best way to get the info condensed even more
        // into a ditionary showing the overall info for each day
    const [day1,setDay1]=useState([])
    const [day2,setDay2]=useState([])
    const [day3,setDay3]=useState([])
    const [day4,setDay4]=useState([])
    const [day5,setDay5]=useState([])

    useEffect(() => {
      fetchCurrentData()
      fetchForcastedData()
    }, []);
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
            // this gives a forcast for every three hours each day - 8 hours forecasted each day
                    // so every 9th item in the list is the start of a new day
                // need to consolidate this data and get the overall max and min for each day
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/forecast?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
            );

            const result = response.data;
            setForcastData(result.list);

            setTimeout(() => {
              setIsLoading(false);
            }, 1000); // Simulating a delay for demonstration purposes

          } catch (error) {
            console.error('Error fetching weather data:', error);
            setIsLoading(false);

          }
        }
      };

      console.log(forcastdata)

    const getDate=(dt_txt)=>dt_txt.split(' ')[0]
    if(forcastdata !==null){
      const groupedDataByDay=forcastdata.reduce((result, item)=>{
        const day= getDate(item.dt_txt)
        if (!result[day]) {
          result[day] = [];
        }
        result[day].push(item);
        return result;
      }, {});

      const groupedDataArray = Object.values(groupedDataByDay);
      console.log(groupedDataArray)
  }
    return (
        <div>WeatherDisplay</div>
    )
}
