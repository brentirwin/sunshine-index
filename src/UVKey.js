import React from 'react';
import { colorMap } from './colors.js';

const UVKey = props => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((x, key) => {
    return (
      <div 
        key={key}
        style={{ backgroundColor: colorMap(x),
                 color: x < 8 ? '#000' : '#ddd' }}>
        {x}
      </div>
    );
  });
  return <div className="uv-key">{arr}</div>
}

export default UVKey;
