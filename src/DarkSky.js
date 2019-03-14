import React from 'react';
import image from './img/darksky.png';

const DarkSky = props => {
  return (
    <div id="darksky">
      <a href="https://darksky.net/poweredby/">
        <img src={image} alt="Powered by DarkSky"/>
      </a>
    </div>
  );
}

export default DarkSky;
