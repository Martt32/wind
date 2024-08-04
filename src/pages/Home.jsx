import React, { useState } from 'react';
import LottieAnimation from '../components/TreeComponent';
import Clouds from '../components/Clouds'
import HouseAnime from '../components/House'
import Lottie from 'lottie-react'
import Compass from '../components/Compass'

const Home = () => {
  const [windSpeed, setWindSpeed] = useState(1);
  const [treeType, setTreeType] = useState('oak');
  const [precipitation, setPrecipitation] = useState(0);
  const [direction, setDirection] = useState(0);

  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex ' style={{ position: 'relative', width: '300px', height: '100px' }}>
        <Clouds windSpeed={windSpeed}/>
        <Clouds windSpeed={windSpeed}/>
        <Clouds windSpeed={windSpeed}/>
        <Clouds windSpeed={windSpeed}/>
        </div>
      <div className='flex'>
      <LottieAnimation 
        windSpeed={windSpeed} 
        treeType={treeType} 
        direction={direction}
        precipitation={precipitation} 
      />
      <div style={{ position: 'relative', width: '300px', height: '300px' }}>

      <HouseAnime windSpeed={windSpeed} precipitation={precipitation} />
      </div>
      <LottieAnimation 
        windSpeed={windSpeed} 
        treeType={treeType}
        direction={direction}
        precipitation={precipitation} 
      />
      </div>
      </div>
      
      <div className='flex font-bold justify-center items-center space-x-6 text-white p-4 bg-darkOpac rounded-lg'>

      <div>
        <label className='flex flex-col space-y-4 p-4'>
          Wind Speed: {windSpeed} mph
          <input
            type="range"
            min="1"
            max="120"
            step="1"
            value={windSpeed}
            onChange={(e) => setWindSpeed(Number(e.target.value))}
          />
        </label>
      </div>
      <Compass direction={direction}/>
      <div className='flex flex-col space-y-4'>
        <label className='flex flex-col space-y-4 p-4'>
          Tree Type:
          <select value={treeType} className='text-black' onChange={(e) => setTreeType(e.target.value)}>
            <option value="oak">Oak</option>
            <option value="pine">Pine</option>
            <option value="palm">Palm</option>
          </select>
        </label>
      </div>

      <div className='flex flex-col space-y-4'>
        <label className='flex flex-col space-y-4 p-4'>
          Direction: {direction} deg
          <input
            type="range"
            min="0"
            max="315"
            step="1"
            value={direction}
            onChange={(e) => setDirection(Number(e.target.value))}
          />
        </label>
      </div>

      <div className='flex flex-col space-y-4'>
        <label className='flex flex-col space-y-4 p-4'>
          Precipitation: {precipitation} mm
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={precipitation}
            onChange={(e) => setPrecipitation(Number(e.target.value))}
          />
        </label>
      </div>
      </div>
      
    </div>
  );
};

export default Home;
