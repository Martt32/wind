import TreeComponent from '../components/TreeComponent'
import React, { useRef, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import rainAnimationData from '../assets/Rain';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls, useGLTF } from '@react-three/drei';  
import TreeModel from '../components/TreeModel';
import { TextureLoader } from 'three';
import House from '../components/House'
import Compass from '../components/Compass'
import { Suspense } from 'react';
import LeavesAnimation from '../components/LeavesAnimation'; 


const SecondPage = () => {
    const [windSpeed, setWindSpeed] = useState(1);
    const [treeType, setTreeType] = useState('Oak');
    const [trimming, setTrimming] = useState('');
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
    const rainRef = useRef();
    useEffect(() => {
      if (rainRef.current) {
        const rainSpeed = precipitation / 100; // Normalize precipitation to a speed value
        rainRef.current.setSpeed(rainSpeed);
      }
      // const totalFrames = animationData.op;
      // lottieRef.current.goToAndStop(totalFrames, true)
    }, [precipitation]);
    const [alpha, setAlpha] = useState(1);
    function callAlpha(){
      let al = 1
      if(trimming === ''){
        
        setAlpha(1)
      }
      if(trimming === 'twenty'){
        let al = 100 - 20 
        setAlpha(al / 100)
      }
      if(trimming === 'thirty'){
        let al = 100 - 30 
        setAlpha(al / 100)
      }
      if(trimming === 'forty'){
        let al = 100 - 40 
        setAlpha(al / 100)
      }
      if(trimming === 'ten'){
        let al = 100 - 50 
        setAlpha(al / 100)
      }
      if(trimming === 'sixty'){
        let al = 100 - 60 
        setAlpha(al / 100)
      }
      if(trimming === 'seventy'){
        let al = 100 - 70 
        setAlpha(al / 100)
      }
      if(trimming === 'eighty'){
        let al = 100 - 80 
        setAlpha(al / 100)
      }
      if(trimming === 'ninety'){
        let al = 100 - 90 
        setAlpha(al / 100)
      }if(trimming == 'ten'){
        setAlpha(0.9)
      }
    }
    const [hurricane, setHurricane] = useState()
    function callHurr() {
      if(windSpeed > 0){
        setHurricane('Tropical Depression')
      }if(windSpeed > 38){
        setHurricane('Tropical Storm')
      }if(windSpeed > 73){
        setHurricane('Category 1 Hurricane')
      }if(windSpeed > 95){
        setHurricane('Category 2 Hurricane')
      }if(windSpeed > 110){
        setHurricane('Category 3 Hurricane')
      }if(windSpeed > 130){
        setHurricane('Category 4 Hurricane')
      }if(windSpeed > 156){
        setHurricane('Category 5 Hurricane')
      }
    } 
    useEffect(() => {
      callAlpha()
    },[trimming])

    useEffect(() => {
      callHurr()
    },[windSpeed])
    return (
      <div className='flex flex-col justify-center items-center'>
        <p className='font-bold text-white text-2xl'>Hurricane Type: {hurricane}</p>
        <div className='flex p-5'>
        <div>
          <div className={`transform rotate-${rotate} relative`} style={{ transition:'.8s', width: '50vw', height:'100vh' }}>
  
          { windSpeed > 37 &&
            <LeavesAnimation direction={direction} />
            }
  
               <Canvas   camera={{ position: [5, 10, 20], fov: 50 }}>
               <ambientLight intensity={0.5} />
               <directionalLight position={[10, 10, 10]} intensity={1} />
               {trimming === '' ? <TreeModel 
                 objUrl={`./assets/tree/${treeType}.obj`} 
                 mtlUrl={`./assets/tree/${treeType}.mtl`}
                 windSpeed={windSpeed < 75 ? windSpeed : 0} 
                 trimming={trimming}
                 /> :
                 <TreeModel 
                 objUrl={`./assets/trimmed/${treeType}${trimming}.obj`} 
                 mtlUrl={`./assets/trimmed/${treeType}${trimming}.mtl`}
                 windSpeed={windSpeed < 75 ? windSpeed : 0} 
                 trimming={trimming}
                 />
                 }
                      <OrbitControls />
                      </Canvas>
                 {precipitation > 0 && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                      <Lottie lottieRef={rainRef} animationData={rainAnimationData} loop={true} />
                    </div>
                  )}
            </div>
        </div>
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
            </div>
        {/* Add controls to change wind speed */}
        <div className='control flex font-bold justify-center items-center space-x-6 text-white p-4 bg-darkOpac rounded-lg'>
  
        <div>
          <label className='flex flex-col space-y-4 p-4'>
          Wind Speed: {windSpeed} mph
            <input
          type="range"
          min="1"
          max="160"
          onChange={(e) => setWindSpeed(Number(e.target.value))}
        />
          </label>
        </div>
        <div>
          <label className='flex flex-col space-y-4 p-4'>
          Force: {windSpeed > 30 ? windSpeed - 30 : windSpeed} F
          
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
            <select
             value={trimming} className='text-black' 
             onChange={(e) => setTrimming(e.target.value)}>
              <option value=''>0%</option>
              <option value='ten'>10%</option>
              <option value='twenty'>20%</option>
              <option value='thirty'>30%</option>
              <option value='forty'>40%</option>
              <option value='fifty'>50%</option>
              <option value='sixty'>60%</option>
              <option value='seventy'>70%</option>
              <option value='eighty'>80%</option>
              <option value='ninety'>90%</option>
            </select>
          </label>
          
        </div>
        <p>Alpha (a): {alpha}</p> 
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
}

export default SecondPage