import React, { useEffect, useRef, useMemo } from 'react';
import Lottie from 'lottie-react';
import rainAnimationData from '../assets/Rain';
import House from '../assets/House.json'
import RooflessHouse from '../assets/RooflessHouse.json'
import StaticLottie from './StaticHouse'
import branch from '../assets/branch.json'

const HouseAnime = ({ windSpeed, precipitation }) => {
  const lottieRef = useRef();
  const rainRef = useRef();
  const branchRef = useRef();



  useEffect(() => {
    if (rainRef.current) {
      const rainSpeed = precipitation / 100; // Normalize precipitation to a speed value
      rainRef.current.setSpeed(rainSpeed);
    }
    // const totalFrames = animationData.op;
    // lottieRef.current.goToAndStop(totalFrames, true)
  }, [precipitation]);


  return (
    <div style={{ position: 'relative', width: '500px', height: '500px' }}>
      {
        windSpeed > 75 ?
        <StaticLottie  animationData={RooflessHouse} loop={false} />
        :
        <Lottie lottieRef={lottieRef}  animationData={House} loop={false} />}
      {precipitation > 0 && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <Lottie lottieRef={rainRef} animationData={rainAnimationData} loop={true} />
        </div>
      )}
      {/* {windSpeed > 75 &&  (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '120%', height: '120%' }}>
          <Lottie lottieRef={branchRef} animationData={branch} loop={true} />
        </div>
      )} */}
    </div>
  );
};

export default HouseAnime;
