import React, { useEffect, useRef } from 'react';
import { EffectComposer } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/jsm/postprocessing/UnrealBloomPass.js';

import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/jsm/loaders/GLTFLoader.js';

const ThreeDScene = () => {
  const containerRef = useRef();
  const clock = new THREE.Clock(); // Used for animation

  // Variables for scene, camera, renderer, and mixers
  let scene, camera, renderer, planeModel;
  let mixers = [];
  const delayBetweenModels = 500; // Delay between each model's appearance in milliseconds

  useEffect(() => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
  
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 10);
    camera.rotation.set(0, -0.25, 0);
  
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
  
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }
  
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
  
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 3.7);
    hemisphereLight.position.set(10 , 10, 0.5);
    scene.add(hemisphereLight);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 13.2);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = false;
  
    directionalLight.shadow.mapSize.width = 256;
    directionalLight.shadow.mapSize.height = 256;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.bias = -0.001;
  
    scene.add(directionalLight);
  
    // Post-processing setup
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
  
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8, // intensity
      0.4, // radius
      0.85 // threshold
    );
    composer.addPass(bloomPass);
  
    const loader = new GLTFLoader();
    loader.load('plane.glb', function (gltf) {
      planeModel = gltf.scene;
      planeModel.position.set(10, 0, -13);
      planeModel.rotation.set(0, -1.8, 0);
      planeModel.scale.set(12, 12, 12);
      planeModel.receiveShadow = true;
      scene.add(planeModel);
  
      loadAndPlaceModels(loader);
    }, undefined, function (error) {
      console.error('An error happened while loading the plane model:', error);
    });
  
    window.addEventListener('resize', onWindowResize);
  
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixers.forEach((mixer) => mixer.update(delta));
  
      composer.render();
    };
    animate();
  
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  // Function to handle window resize
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  let isTempleLoaded = false;

  // Function to load and place the temple models with animation
  const loadAndPlaceModels = (loader) => {
    if (!isTempleLoaded) {
      const positions = [
        [12.5, 1, 1], 
        [12.5, 1, 5], 
        [-9, 1, -5], 
        [-10, 1, 1]
      ];

      positions.forEach((position, index) => {
        setTimeout(() => {
          loader.load('temple.glb', function (gltf) {
            const model = gltf.scene;
            model.position.set(position[0], position[1], position[2]);
            model.castShadow = true;  // Cast shadows
            scene.add(model);

            const mixer = new THREE.AnimationMixer(model);
            mixers.push(mixer);
            const action = mixer.clipAction(gltf.animations[0]);
            action.setLoop(THREE.LoopOnce);
            action.clampWhenFinished = true;
            action.play();
          }, undefined, function (error) {
            console.error('An error happened while loading the temple model:', error);
          });
        }, index * delayBetweenModels);
      });

      isTempleLoaded = true;
    }
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
  );
};

export default ThreeDScene;