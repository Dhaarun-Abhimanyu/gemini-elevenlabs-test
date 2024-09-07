import React, { useEffect, useRef } from 'react';
import TWEEN from 'https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.esm.min.js';
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/jsm/loaders/GLTFLoader.js';

import { useNavigate } from 'react-router-dom';  // For React Router navigation

const ThreeDModel = () => {
  const containerRef = useRef(null); // To reference the DOM container
  const navigate = useNavigate();    // For programmatic navigation
  let scene, camera, renderer, model, raycaster, mouse, hoveredSegment = null;

  useEffect(() => {
    init();

    // Clean up function to remove the scene on component unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onDocumentClick);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []); // Empty dependency array to run the effect only once

  const init = () => {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Attach the renderer to the container in the DOM
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(2, 6, 10).normalize();
    scene.add(light);

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load('/PLAIN.glb', function (gltf) {
      model = gltf.scene;
      model.scale.set(4.4, 4.4, 4);
      model.position.set(4, 0.9, -1);
      model.rotation.set(13.8, 0, 0);
      scene.add(model);

      // Hide loading screen and show header after 3 seconds
      document.getElementById('loading-screen').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('header').style.display = 'flex';
      }, 3000);

      // Set initial camera position
      camera.position.z = 20;
      camera.position.y = 0;
      camera.position.x = 100;

      // Tween to zoom in
      new TWEEN.Tween(camera.position)
        .to({ x: 0, y: 0, z: 15 }, 2000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      // Start the animation loop
      animate();
    }, undefined, function (error) {
      console.error('An error happened while loading the model:', error);
    });

    camera.position.z = 20;

    // Raycaster for mouse interactions
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Event listeners
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('click', onDocumentClick, false);
    window.addEventListener('resize', onWindowResize, false);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    TWEEN.update();
    renderer.render(scene, camera);
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const onMouseMove = (event) => {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    const infoContainer = document.getElementById('info-container');

    if (intersects.length > 0) {
      const hoveredObject = intersects[0].object;

      if (hoveredObject !== hoveredSegment) {
        if (hoveredSegment) {
          new TWEEN.Tween(hoveredSegment.scale)
            .to({ x: 1, y: 1, z: 1 }, 300)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
          document.getElementById(`text-${hoveredSegment.name}`).classList.remove('show');
        }

        if (["1", "2", "3", "4", "5", "6"].includes(hoveredObject.name)) {
          new TWEEN.Tween(hoveredObject.scale)
            .to({ x: 1.2, y: 1.2, z: 1.2 }, 300)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
          hoveredSegment = hoveredObject;

          const textElement = document.getElementById(`text-${hoveredSegment.name}`);
          textElement.style.left = `${event.clientX}px`;
          textElement.style.top = `${event.clientY}px`;
          textElement.classList.add('show');

          // Update info container text based on hovered segment
          switch (hoveredSegment.name) {
            case '1':
              infoContainer.innerHTML = 'Region: North<br><br>Current Population: 173 million<br><br>The Birthplace of Civilization and Empires: Uncover the ancient roots of the Indian subcontinent in the fertile plains of the North. Explore the history of the Indus Valley Civilization, the Mauryan and Gupta Empires, and the rich cultural heritage that shaped early Indian history'; // Add your content
              break;
            case '2':
              infoContainer.innerHTML = "Region: West<br><br>Current Population: 123 million<br><br>Trade and Conquest: The Western Gateway: Delve into the history of ancient trade routes, maritime powers, and the rise of formidable kingdoms like the Marathas. This region has seen the interplay of various cultures, from ancient traders to colonial forces, leaving a profound impact on India's history."; // Add your content
              break;
            case '3':
              infoContainer.innerHTML = "Region: Central<br><br>Current Population: 85 million<br><br>The Heartland of Dynasties: Journey through the heart of India, where mighty empires like the Mughals and the Rajputs ruled. Discover the blend of architectural marvels, spiritual traditions, and the rich tapestry of cultures that flourished in this central hub."; // Add your content
              break;
            case '4':
              infoContainer.innerHTML = "Region: East<br><br>Current Population: 102 million<br><br>Cradle of Eastern Wisdom: Step into the eastern lands, where spirituality and knowledge blossomed. From the ancient university of Nalanda to the spread of Buddhism, this region has been a center of learning and cultural exchange for centuries"; // Add your content
              break;
            case '5':
              infoContainer.innerHTML ="Region: South<br><br>Current Population: 143 million<br><br>The Southern Kingdoms: A Legacy of Arts and Temples: Explore the rich  culture, the grandeur of the Chola and Vijayanagara empires, and the intricate temple architecture that dots the southern landscape. This region is a treasure trove of classical music, dance, and ancient traditions."; // Add your content
              break;
            case '6':
              infoContainer.innerHTML = "Region: North-East<br><br>Current Population: 45 million<br><br>The Mystical Northeast: A Blend of Cultures and Nature: Discover the rich and diverse heritage of the northeastern states, where unique tribal traditions, ancient kingdoms, and untouched natural beauty converge. This region's history is as vibrant as its landscapes, with a blend of cultures that is truly unique."; // Add your content
              break;
          }
          infoContainer.style.opacity = '1';
        }
      }
    } else {
      if (hoveredSegment) {
        new TWEEN.Tween(hoveredSegment.scale)
          .to({ x: 1, y: 1, z: 1 }, 300)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
        document.getElementById(`text-${hoveredSegment.name}`).classList.remove('show');
        hoveredSegment = null;
      }
      infoContainer.style.opacity = '0';
    }
  };

  const onDocumentClick = (event) => {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;

      if (["1", "2", "3", "4", "5", "6"].includes(clickedObject.name)) {
        const clickedPosition = new THREE.Vector3().setFromMatrixPosition(clickedObject.matrixWorld);
        const direction = new THREE.Vector3().subVectors(camera.position, clickedPosition).normalize();
        const targetPosition = clickedPosition.add(direction.multiplyScalar(2)); // Adjust the scalar for zoom level

        // Tween to move the camera towards the clicked object
        new TWEEN.Tween(camera.position)
          .to({ x: targetPosition.x, y: targetPosition.y, z: targetPosition.z }, 1000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();

        new TWEEN.Tween(camera.rotation)
          .to({ x: Math.PI / 4 }, 1000) // Adjust rotation if necessary
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();

        // Redirect after animation completes
        new TWEEN.Tween(camera.position).to({}, 1000).onComplete(() => {
          switch (clickedObject.name) {
            case '1':
              navigate('/north'); // Route to '/north'
              break;
            case '2':
              navigate('/west'); // Route to '/west'
              break;
            case '3':
              navigate('/central'); // Route to '/central'
              break;
            case '4':
              navigate('/east'); // Route to '/east'
              break;
            case '5':
              navigate('/south'); // Route to '/south'
              break;
            case '6':
              navigate('/northeast'); // Route to '/northeast'
              break;
            default:
              break;
          }
        }).start();
      }
    }
  };

  return (
    <div>
      {/* Loading Screen */}
      <div id="loading-screen">
        <img src="/logo.png" alt="Welcome Logo" id="loading-logo" />
      </div>

      {/* Header */}
      <div id="header" style={{ display: 'none' }}>
        <img src="/logo.png" alt="Logo" id="header-logo" />
        <div className="dropdown">
          <button className="dropbtn">Menu</button>
          <div className="dropdown-content">
            <a href="#">Option 1</a>
            <a href="#">Option 2</a>
            <a href="#">Option 3</a>
            <a href="#">Option 4</a>
            <a href="#">Option 5</a>
            <a href="#">Option 6</a>
          </div>
        </div>
      </div>

      {/* Hover Texts */}
      <div id="hover-texts">
        <div className="hover-text" id="text-1">NORTH</div>
        <div className="hover-text" id="text-2">WEST</div>
        <div className="hover-text" id="text-3">CENTRAL</div>
        <div className="hover-text" id="text-4">EAST</div>
        <div className="hover-text" id="text-5">SOUTH</div>
        <div className="hover-text" id="text-6">NORTH-EAST</div>
      </div>

      {/* Info Container */}
      <div id="info-container"></div>

      {/* Renderer Container */}
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default ThreeDModel;
