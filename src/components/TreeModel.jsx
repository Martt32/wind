// TreeModel.js
import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TextureLoader } from 'three';
import gsap from 'gsap';

const TreeModel = ({ objUrl, mtlUrl, windSpeed, trimming }) => {
  const materials = useLoader(MTLLoader, mtlUrl);
  const obj = useLoader(OBJLoader, objUrl, loader => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const treeRef = useRef();

  useEffect(() => {
    if (treeRef.current && windSpeed < 75) {
      gsap.to(treeRef.current.rotation, {
        y: Math.sin(windSpeed - trimming) * 0.4, // Adjust the multiplier as needed
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'power1.inOut'
      });
    }
  }, [windSpeed]);

  useEffect(() => {
    if (treeRef.current) {
      treeRef.current.scale.set(0.1, 0.1, 0.1); // Adjust the scale as needed
    }
  }, [obj]);

  return <primitive ref={treeRef} object={obj} />;
};

export default TreeModel;
