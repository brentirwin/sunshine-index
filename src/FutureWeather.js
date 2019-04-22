import React from 'react';
import { colorMap } from './colors.js';
import { times } from './times.js';
import Skycon from 'react-skycons';

const FutureWeather = props => {
  if (!props.init) return null;

  const hourly = props.hourly.data.slice(0,12).map((hour, key) => {
    const time = new Date(hour.time*1000).getHours();
    const weather = {
      temp: Math.round(hour.temperature),
      icon: hour.icon.toUpperCase().split('-').join('_'),
      uv: hour.uvIndex,
      time: times(parseInt(time))
    };

    const styles = () => {
      const color = colorMap(weather.uv);
      return {
        backgroundColor: color + '80',
        border: '5px solid ' + color
      }
    }

    return (
      <div
        key={key}
        style={styles()}
        className="hour"
        >
        <span className="time">{weather.time}</span>
        <span className="temp">{weather.temp}</span>
        <span className="uv">{weather.uv}</span>
        <span className="skycon">
          <div>
          <Skycon
            color="black"
            icon={weather.icon}
          />
          </div>
        </span>
      </div>
    );
  });

  return (
    <div id="future-weather">
      <div
        key="key"
        style={{ backgroundColor: '#ffffff80', border: '5px solid white'}}
        className="key"
        >
        <span>Time</span>
        <span>Temp</span>
        <span>UV</span>
        <span></span>
      </div>
      {hourly}
    </div>
  );
}

export default FutureWeather;
