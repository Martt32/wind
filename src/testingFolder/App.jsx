import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const WIND_SPEED_THRESHOLD = 50;

function HouseModel({ windSpeed }) {
  const group = useRef();
  const { scene } = useGLTF('./assets/building.glb'); // Correct path to house model
  const roof = useRef();

  console.log('Loaded scene:', scene);

  // Adjust these names based on your GLTF file structure
  const houseNode = scene.getObjectByName('House');
  const roofNode = scene.getObjectByName('Roof');

  console.log('House node:', houseNode);
  console.log('Roof node:', roofNode);

  const [roofBlownAway, setRoofBlownAway] = useState(false);

  useEffect(() => {
    if (windSpeed >= WIND_SPEED_THRESHOLD && !roofBlownAway) {
      setRoofBlownAway(true);
    }
  }, [windSpeed, roofBlownAway]);

  useFrame(() => {
    if (roofBlownAway && roof.current) {
      roof.current.position.y += 0.1;
      roof.current.rotation.z += 0.01;
    }
  });

  return (
    <group ref={group} dispose={null}>
      {houseNode && (
        <primitive object={houseNode} castShadow receiveShadow />
      )}
      {roofNode && (
        <primitive ref={roof} object={roofNode} castShadow receiveShadow />
      )}
    </group>
  );
}

function App() {
  const [windSpeed, setWindSpeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWindSpeed((prevSpeed) => (prevSpeed + 5) % 100);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        shadows
        camera={{ position: [0, 1, 5], fov: 60 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <Suspense fallback={null}>
          <HouseModel windSpeed={windSpeed} />
        </Suspense>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[500, 500]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
        <OrbitControls />
      </Canvas>
      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        <p>Wind Speed: {windSpeed} mph</p>
      </div>
    </div>
  );
}

export default App;
