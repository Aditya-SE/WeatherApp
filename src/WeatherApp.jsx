import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function WeatherApp() {
  let [WeatherInfo, setWeatherInfo] = useState({
    city: "wonderLand",
    feelslike: 29.53,
    humidity: 83,
    temp: 26.79,
    tempMax: 26.79,
    tempMin: 26.79,
    weather: "overcast clouds",
  });
  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Weather App</h3>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={WeatherInfo} />
    </div>
  );
}
