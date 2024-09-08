import React, { useEffect, useRef } from 'react';
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
    // Initialize Three.js scene, camera, and renderer
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue background

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 10);
    camera.rotation.set(0, -0.25, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;  // Enable shadows

    // Append renderer to the container ref
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Lights - Soft ambient and hemisphere lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Softer ambient light
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.7); // Simulate sky lighting
    hemisphereLight.position.set(0, 20, 0);
    scene.add(hemisphereLight);

    // Directional light with soft shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.2);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;

    // Configure shadow settings for softness
    directionalLight.shadow.mapSize.width = 256;  // Higher shadow resolution for smoother shadows
    directionalLight.shadow.mapSize.height = 256;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.bias = -0.001; // Reduce shadow artifacts for a softer edge

    scene.add(directionalLight);

    // Load the plane model
    const loader = new GLTFLoader();
    loader.load('plane.glb', function (gltf) {
      planeModel = gltf.scene;
      planeModel.position.set(10, 0, -13   );
      planeModel.rotation.set(0,-1.8,0);
      planeModel.scale.set(12, 12, 12); // Adjust the scale if needed
      planeModel.receiveShadow = true;  // Allow plane to receive shadows
      scene.add(planeModel);

      // Load and place the temple models
      loadAndPlaceModels(loader);
    }, undefined, function (error) {
      console.error('An error happened while loading the plane model:', error);
    });

    // Event listeners for window resize
    window.addEventListener('resize', onWindowResize);

    // Animate the scene
    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      mixers.forEach((mixer) => mixer.update(delta));

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup event listeners on component unmount
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
