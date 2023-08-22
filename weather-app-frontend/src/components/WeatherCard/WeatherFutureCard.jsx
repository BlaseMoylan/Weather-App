const WeatherFutureCard = ({ minMax, averageHumidity, weatherDescription, date }) => {
    const refresh = () => {
        window.location.reload();
      };
    return (
        <div className="???">
        <p>Date: {date}</p>
        <p>Temperature: {Math.round(minMax.maxTemp)}°F / {Math.round(minMax.minTemp)}°F</p>
        <p>Humidity: {Math.round(averageHumidity)}%</p>
        <p>Weather: {weatherDescription}</p>
        </div>
    );
    };     

export default WeatherFutureCard;