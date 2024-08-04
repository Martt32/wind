// StaticLottie.js
import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';

const StaticLottie = ({ animationData }) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      // Get the total number of frames from the animation data
      const totalFrames = animationData.op;

      // Go to the last frame and stop
      lottieRef.current.goToAndStop(totalFrames, true);
    }
  }, [animationData]);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={false}
      autoplay={false}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default StaticLottie;
