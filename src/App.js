import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { darkSkyAPIkey } from './darksky-api.js';
import sampleData from './sampleData.json';
import ZipForm from './ZipForm.js';
import DarkSky from './DarkSky.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '78752',
      locData: {},
      weather: {},
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
      // Dev without making API calls
      if (zip === '78752') return sampleData;

      // Get loc data from ZIP
      const url_zip = "https://api.zippopotam.us/us/" + zip;
      const locData = await axios.get(url_zip).then(res => {
        return res.data.places[0];
      }).catch(err => {
        console.log('Not a valid ZIP');
      });

      // Get weather data with loc data
      const url_weather = "https://cors.io/?https://api.darksky.net/forecast/" + darkSkyAPIkey + "/" + locData.latitude + "," + locData.longitude;
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
          <DarkSky />
        </main>
      </div>
    );
  }
}

export default App;
