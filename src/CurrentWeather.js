import React from 'react';
import { colorMap } from './colors.js';
import Skycons from 'react-skycons';

const CurrentWeather = props => {
  if (!props.init) return null;

  const location = props.location['place name']
                   + ', '
                   + props.location['state abbreviation'];
  const weather = {
    temp: Math.round(props.weather.temperature),
    icon: props.weather.icon.toUpperCase().replace('-','_'),
    feelsLike: Math.round(props.weather.apparentTemperature),
    humidity: props.weather.humidity,
    clouds: props.weather.cloudCover,
    uv: props.weather.uvIndex,
    wind: props.weather.windSpeed
  };

  const styles = () => {
    const color = colorMap(weather.uv);
    return {
      backgroundColor: color + '80',
      border: '5px solid ' + color
    }
  }


  console.log(weather.icon);
  return(
    <div id="current" style={styles()}>
      <h2>{location}</h2>
      <div id="current-weather">
        <div className="left">
          {weather.temp}°
        </div>
        <div className="middle">
          <ul>
            <li>UV Index: {weather.uv}</li>
            <li>Feels Like: {weather.feelsLike}°</li>
            <li>Humidity: {weather.humidity}</li>
          </ul>
        </div>
        <div className="right">
          <Skycons
            color='black'
            icon={weather.icon}
            />
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
