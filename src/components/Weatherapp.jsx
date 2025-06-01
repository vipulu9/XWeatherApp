import styles from "./Weatherapp.module.css";
import { useEffect, useState } from "react";
const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_Key = "e7d6a7dc0254428cb9b114510243007";
  const fetchWeatherApi = async () => {
    setLoading(true);
    setWeather(null);
    try {
      const Response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_Key}&q=${city}`
      );
      const Result = await Response.json();
      setWeather(Result);
    } catch (e) {
      alert("Failed to fetch weather data: " + e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeatherApi();
  }, []);
  const handleSearch = () => {
    fetchWeatherApi();
  };
  return (
    <div className={styles.weatherContainer}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading data...</p>}
      {weather && weather.current && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Tempature </h3>
            <p> {weather.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3> Condition </h3>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3> Wind Speed </h3>
            <p>{weather.current.wind_kph}kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;