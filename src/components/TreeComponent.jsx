import React, { useEffect, useRef, useMemo } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/Animation - 1720291997875.json'
import StaticLottie from './StaticHouse'
import rainAnimationData from '../assets/Rain';

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
      
        <Lottie lottieRef={lottieRef} speed={windSpeed} animationData={animationData} loop={true} />
      
    </div>
  );
};

export default HouseAnime;





// Tree.js
// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, useFBX } from '@react-three/drei';

// const Tree = ({ url }) => {
//   const treeRef = useRef();

//   // Load the FBX model
//   const fbx = useFBX(url);

//   // Optional: Apply any transformations to the model
//   useEffect(() => {
//     if (treeRef.current) {
//       treeRef.current.scale.set(0.1, 0.1, 0.1); // Adjust the scale as needed
//     }
//   }, [fbx]);

//   // Rotate the tree for demonstration
//   useFrame(() => {
//     if (treeRef.current) {
//       treeRef.current.rotation.y += 0.01;
//     }
//   });

//   return (
//     <primitive ref={treeRef} object={fbx} />
//   );
// };

// const App = () => {
//   return (
//     <Canvas>
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 5, 5]} />
//       <Tree url="./assets/fbxOak.fbx" />
//       <OrbitControls />
//     </Canvas>
//   );
// };

// export default App;
