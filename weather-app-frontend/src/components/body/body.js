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

import { useState } from "react";
import React from "react";
import axios from "axios";
import "./body.css"

export default function body({lat,long}){
    // the default useState will need to be set to the home location of the account ( I will work on this later )
    // 
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        if (lat && long) {
          setIsLoading(true);
    
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/forecast?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
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
      console.log(data)
    return (
        <div>body</div>
    )
}
