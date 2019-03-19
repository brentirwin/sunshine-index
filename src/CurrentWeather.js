import React from 'react';

const CurrentWeather = props => {
  if (!props.init) return null;

  const location = props.location['place name']
                   + ', '
                   + props.location['state abbreviation'];
  const weather = {
    temp: Math.round(props.weather.temperature),
    icon: props.weather.icon,
    feelsLike: Math.round(props.weather.apparentTemperature),
    humidity: props.weather.humidity,
    clouds: props.weather.cloudCover,
    uv: props.weather.uvIndex,
    wind: props.weather.windSpeed
  };


  return(
    <div id="current">
      <h2>{location}</h2>
      <div id="current-weather">
        <div className="left">
          {weather.temp}°
        </div>
        <div className="right">
          <ul>
            <li>UV Index: {weather.uv}</li>
            <li>Feels Like: {weather.feelsLike}°</li>
            <li>Humidity: {weather.humidity}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
