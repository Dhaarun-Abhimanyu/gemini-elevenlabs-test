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
    camera.position.set(0, 6, 10);
    camera.rotation.set(0, -0.25, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append renderer to the container ref
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Load the plane model
    const loader = new GLTFLoader();
    loader.load('plane.glb', function (gltf) {
      planeModel = gltf.scene;
      planeModel.scale.set(12, 12, 12); // Adjust the scale if needed
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

  // Function to load and place the temple models with animation
  const loadAndPlaceModels = (loader) => {
    const positions = [
      [12.5, 1, 1], // Top-left
      [12.5, 1, 5], // Top-right
      [-9, 1, -5], // Bottom-left
      [-10, 1, 1], // Bottom-right
    ];

    positions.forEach((position, index) => {
      setTimeout(() => {
        loader.load('temple.glb', function (gltf) {
          const model = gltf.scene;
          model.position.set(position[0], position[1], position[2]);
          scene.add(model);

          // Setup animation
          const mixer = new THREE.AnimationMixer(model);
          mixers.push(mixer);
          const action = mixer.clipAction(gltf.animations[0]);
          action.setLoop(THREE.LoopOnce); // Play animation only once
          action.clampWhenFinished = true; // Keep the final frame after animation ends
          action.play();
        }, undefined, function (error) {
          console.error('An error happened while loading the temple model:', error);
        });
      }, index * delayBetweenModels); // Delay each model's appearance
    });
  };
  

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
  );
};

export default ThreeDScene;
