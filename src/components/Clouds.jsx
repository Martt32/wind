import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Clouds from '../assets/Clouds.json'
import Lottie from 'lottie-react'
const Cloud = ({ windSpeed }) => {
  const cloudRef = useRef();

  useEffect(() => {
    if (cloudRef.current) {
      // Create a timeline for the swaying motion
      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      // Calculate the duration based on the wind speed
      const duration = 10 / (windSpeed / 10); // Adjust this formula as needed

      // Define the swaying animation
      tl.to(cloudRef.current, { x: 50, duration, ease: 'sine.inOut' });
      tl.to(cloudRef.current, { x: -50, duration, ease: 'sine.inOut' });
    }
  }, [windSpeed]);

  return (
    <svg
      ref={cloudRef}
      viewBox="0 0 100 60"
      width="100"
      height="60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 20a10 10 0 1 1 20 0h30a10 10 0 1 1 0 20H10a10 10 0 1 1 0-20h20Z"
        fill="#B0E0E6"
      />
    </svg>
  );
};

export default Cloud;
