import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import cloud_icon from "../Assets/cloud.png";
import clear_icon from "../Assets/clear.png";

const WeatherApp = () => {
  let api_key = "128a69d968e6717ed00093f2ca849c9f ";
  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput")[0];
    if (element.value === "") {
      return;
    }

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`;
      let response = await fetch(url);
      let data = await response.json();

      const humidity = document.getElementsByClassName("humidity-percent")[0];
      const wind = document.getElementsByClassName("wind-rate")[0];
      const temperature = document.getElementsByClassName("weather-temp")[0];
      const location = document.getElementsByClassName("weather-location")[0];

      if (data && data.main && data.weather && data.weather[0]) {
        if (humidity) humidity.innerHTML = `${data.main.humidity}`+"%";
        if (wind) wind.innerHTML = `${data.wind.speed} km/h`;
        if (temperature) temperature.innerHTML = `${data.main.temp}`+"°C";
        if (location) location.innerHTML = data.name;

        const iconCode = data.weather[0].icon;

        switch (iconCode) {
          case "01d":
          case "01n":
            setWicon(clear_icon);
            break;

          case "02d":
          case "02n":
            setWicon(cloud_icon);
            break;

          case "03d":
          case "03n":
          case "04d":
          case "04n":
            setWicon(drizzle_icon);
            break;

          case "09d":
          case "09n":
          case "10d":
          case "10n":
            setWicon(rain_icon);
            break;

          case "13d":
          case "13n":
            setWicon(snow_icon);
            break;

          default:
            setWicon(cloud_icon);
            break;
        }
      } else {
        console.error(
          "Invalid or incomplete data received from the API:",
          data
        );
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon">
          <img
            src={search_icon}
            alt=""
            onClick={() => {
              search();
            }}
          />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24°c </div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
