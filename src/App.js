// App.js
import './App.css'
import './main.css'
import TreeComponent from './components/TreeComponent'
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls, useGLTF } from '@react-three/drei';  
import TreeModel from './components/TreeModel';
import { TextureLoader } from 'three';
import House from './components/House'
import Compass from './components/Compass'
import { Suspense } from 'react';
import LeavesAnimation from './components/LeavesAnimation'; 


const App = () => {
  const [windSpeed, setWindSpeed] = useState(1);
  const [treeType, setTreeType] = useState('Oak');
  const [trimming, setTrimming] = useState(0);
  const [precipitation, setPrecipitation] = useState(0);

  const [direction, setDirection] = useState([1, 0]);
  const Tree = () =>{
    if(treeType === 'Oak'){
      <TreeComponent windSpeed={windSpeed} precipitation={precipitation}/>
    }else{
    <Canvas   camera={{ position: [5, 10, 20], fov: 50 }}>
    <ambientLight intensity={0.8} />
    <directionalLight position={[10, 10, 10]} intensity={1} />
    <TreeModel 
      objUrl={`./assets/${treeType}Tree.obj`} 
      mtlUrl={`./assets/${treeType}Tree.mtl` }
      windSpeed={windSpeed < 75 ? windSpeed : 0} 
      trimming={trimming}
      />
    <OrbitControls />
  </Canvas>}
  }
  const handleSliderChange = (event) => {
    const value = event.target.value;
    if (value >= 90 && value <= 180) {
      setDirection([1, 0]); // Move right
    } else if (value >= 180 && value <= 270) {
      setDirection([-1, 0]); // Move left
    }
  };
  let buildingState = 'buildingRoof'
  if(windSpeed > 75 ){
    buildingState = 'building'
  }
  if (windSpeed < 75){
    buildingState = 'buildingRoof'
  }
  // const House = () => {
  //   const {scene} = useGLTF('./assets/building.glb')
  
  //   return <primitive object={scene} scale={1} />;
  // };

  let rotate = 0
  if (windSpeed > 75 ){
    rotate = 90
    
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex p-5'>
        <div className=''>

      {/* <Canvas style={{ width: '50vw', height:'100vh' }} camera={{ position: [0, 0, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <House />
      </Suspense>
      <OrbitControls />
    </Canvas> */}
    <House windSpeed={windSpeed} precipitation={precipitation}/>
    
        </div>
      <div>
        <div className={`transform rotate-${rotate} `} style={{ transition:'.8s', width: '50vw', height:'100vh' }}>

        { windSpeed > 37 &&
          <LeavesAnimation direction={direction} />
          }

          {
            treeType === 'Oak' ?
            <TreeComponent windSpeed={windSpeed < 75 ? windSpeed : 0} 
            trimming={trimming} precipitation={precipitation}/>
             : 
             <Canvas   camera={{ position: [5, 10, 20], fov: 50 }}>
             <ambientLight intensity={0.8} />
             <directionalLight position={[10, 10, 10]} intensity={1} />
             <TreeModel 
               objUrl={`./assets/${treeType}Tree.obj`} 
               mtlUrl={`./assets/${treeType}Tree.mtl` }
               windSpeed={windSpeed < 75 ? windSpeed : 0} 
               trimming={trimming}
               />
             <OrbitControls />
           </Canvas>
          }
          </div>
      </div>
          </div>
      {/* Add controls to change wind speed */}
      <div className='control flex font-bold justify-center items-center space-x-6 text-white p-4 bg-darkOpac rounded-lg'>

      <div>
        <label className='flex flex-col space-y-4 p-4'>
          Wind Speed: {windSpeed} mph
          <input
        type="range"
        min="1"
        max="120"
        onChange={(e) => setWindSpeed(Number(e.target.value))}
      />
        </label>
      </div>
      <Compass direction={direction}/>
      <div className='flex flex-col space-y-4'>
        <label className='flex flex-col space-y-4 p-4'>
          Tree Type:
          <select value={treeType} className='text-black' onChange={(e) => setTreeType(e.target.value)}>
            <option value="Oak">Oak</option>
            <option value="Pine">Pine</option>
            <option value="Palm">Palm</option>
          </select>
        </label>
      </div>
      <div className='flex flex-col space-y-4'>
        <label className='flex flex-col space-y-4 p-4'>
          Trimming:
          <select value={trimming} className='text-black' onChange={(e) => setTrimming(e.target.value)}>
            <option value={0}>0%</option>
            <option value={10}>10%</option>
            <option value={20}>20%</option>
            <option value={30}>30%</option>
            <option value={40}>40%</option>
            <option value={50}>50%</option>
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

export default App;
