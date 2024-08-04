// Tree.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useFBX } from '@react-three/drei';

const Tree = ({ url }) => {
  const treeRef = useRef();

  // Load the FBX model
  const fbx = useFBX(url);

  // Optional: Apply any transformations to the model
  useEffect(() => {
    if (treeRef.current) {
      treeRef.current.scale.set(0.1, 0.1, 0.1); // Adjust the scale as needed
    }
  }, [fbx]);

  // Rotate the tree for demonstration
  useFrame(() => {
    if (treeRef.current) {
      treeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive ref={treeRef} object={fbx} />
  );
};

const App = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Tree url="./assets/fbxOak.fbx" />
      <OrbitControls />
    </Canvas>
  );
};

export default App;
