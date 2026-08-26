import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const GEO_URL = import.meta.env.VITE_GEO_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  let getWeatherInfo = async () => {
    try {
      // Step 1: Geocode the city name to lat/lon
      let geoResponse = await fetch(
        `${GEO_URL}?q=${city}&limit=1&appid=${API_KEY}`
      );
      let geoData = await geoResponse.json();

      if (!geoData || geoData.length === 0) {
        throw new Error("City not found");
      }

      let { lat, lon, name } = geoData[0];

      // Step 2: Get weather using lat/lon
      let response = await fetch(
        `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();

      let result = {
        city: name,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feels_like: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      console.log(city);
      let newInfo = await getWeatherInfo();
      setCity("");
      updateInfo(newInfo);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="city name"
          variant="outlined"
          value={city}
          required
          onChange={handleChange}
        />
        <br />
        <br />

        <Button variant="contained" type="submit">
          Send
        </Button>
        {error && <p style={{ color: "red" }}>No such place in our API!</p>}
      </form>
    </div>
  );
}
