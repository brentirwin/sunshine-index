import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { darkSkyAPIkey } from './darksky-api.js';
import sampleData from './sampleData.json';
import ZipForm from './ZipForm.js';
import DarkSky from './DarkSky.js';
import CurrentWeather from './CurrentWeather.js';
import UVKey from './UVKey.js';
import FutureWeather from './FutureWeather.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: 'test',
      locData: {},
      weather: {},
      initialized: false,
      loading: false
    };

    this.handleZip = this.handleZip.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  handleZip(event) {
    this.setState({ zip: event.target.value });
  }

  async getWeather(event) {
    event.preventDefault();

    this.setState({ loading: true });

    async function getData(zip) {
      // Dev without making API calls
      if (zip === 'test') return sampleData;

      // Get loc data from ZIP
      const url_zip = "https://api.zippopotam.us/us/" + zip;
      const locData = await axios.get(url_zip).then(res => {
        return res.data.places[0];
      }).catch(err => {
        console.log('Not a valid ZIP');
      });

      // Get weather data with loc data
      const url_weather = "https://corsanywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyAPIkey + "/" + locData.latitude + "," + locData.longitude;
      const weather = await axios.get(url_weather).then(res => {
        const data = res.data;
        return data;
      }).catch(err => {
        console.log('error with darkSky API');
        console.log(err);
      });
      return { locData, weather };
    }
    
    const { locData, weather } = await getData(this.state.zip);
   
    this.setState({
      locData: locData,
      weather: weather,
      loading: false,
      initialized: true
    });

    console.log('locData: ', locData);
    console.log('weather: ', weather);
  
  }

  render() {
    return (
      <div className="App">
        <main>
          <ZipForm
            value={this.state.zip}
            handleSubmit={this.getWeather}
            handleChange={this.handleZip}
            />
          <UVKey />
          <p>
            { this.state.loading ? 'Loading...' : '' }
          </p>
          <CurrentWeather
            weather={this.state.weather.currently}
            location={this.state.locData}
            init={this.state.initialized}
            />
          <FutureWeather
            hourly={this.state.weather.hourly}
            init={this.state.initialized}
            />
          <DarkSky />
        </main>
      </div>
    );
  }
}

export default App;
