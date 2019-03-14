import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { darkSkyAPIkey } from './darksky.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '78752',
      weather: {}
    };

    this.handleZip = this.handleZip.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  handleZip(event) {
    this.setState({ zip: event.target.value });
  }

  async getWeather(event) {
    event.preventDefault();
    async function getData(zip) {
      // Get loc data from ZIP
      console.log('in getData');
      const url_zip = "https://api.zippopotam.us/us/" + zip;
      const locData = await axios.get(url_zip).then(res => {
        const loc = res.data.places[0]
        return [loc.latitude, loc.longitude];
      }).catch(err => {
        console.log('Not a valid ZIP');
      });

      console.log(locData);
      // Get weather data with loc data
      const url_weather = "https://api.darksky.net/forecast/" + darkSkyAPIkey + "/" + locData[0] + "," + locData[1];
      const weather = await axios.get(url_weather).then(res => {
        const data = res.data;
        console.log(data);
        return data;
      }).catch(err => {
        console.log('error with darkSky API');
        console.log(err);
      });
      return weather;
    }
    
    const rawWeather = await getData(this.state.zip);
    console.log(rawWeather);
  
  console.log(event);
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.getWeather}>
          <input
            type="text"
            value={this.state.zip}
            onChange={this.handleZip}
            />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
