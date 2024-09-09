import React, { useEffect, useRef } from 'react';
import TWEEN from 'https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.esm.min.js';
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/jsm/loaders/GLTFLoader.js';
import { useNavigate } from 'react-router-dom';

const ThreeDModel = () => {
  const containerRef = useRef(null);
  const modelRef = useRef(null); //go back
  const navigate = useNavigate();
  let scene, camera, renderer, model, pinModel, raycaster, mouse, hoveredSegment = null;
  let loaded = 0;
  let pinnedSegment = null; // To track the currently pinned segment

  useEffect(() => {
    init();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onDocumentClick);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(2, 6, 10).normalize();
    scene.add(light);

    if (loaded === 0) {
      loaded = 1;
      const loader = new GLTFLoader();
      loader.load('/PLAIN.glb', function (gltf) {
        model = gltf.scene;
        model.scale.set(4.4, 4.4, 4);
        model.position.set(4, 0.9, -1);
        model.rotation.set(13.8, 0, 0);
        scene.add(model);

        loader.load('/PIN.glb', function (gltfPin) {
          pinModel = gltfPin.scene;
          pinModel.visible = false;
          pinModel.scale.set(0.5, 0.5, 0.5); // Scale down the pin
          scene.add(pinModel);
        });

        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
          document.getElementById('loading-screen').style.display = 'none';
          document.getElementById('header').style.display = 'flex';
        }, 3000);

        camera.position.set(100, 0, 20);
        new TWEEN.Tween(camera.position)
          .to({ x: 0, y: 0, z: 15 }, 2000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();

        animate();
      }, undefined, function (error) {
        console.error('An error occurred while loading the model:', error);
      });
    }

    camera.position.z = 20;
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

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
        if (!pinnedSegment) {
          // First click: Pin the segment with the pin model
          pinnedSegment = clickedObject;
  
          // Load and position the pin model based on segment
          const loader = new GLTFLoader();
          loader.load('/PIN.glb', function (gltf) {
            pinModel = gltf.scene;
            pinModel.castShadow=true;
            pinModel.scale.set(0.5, 0.5, 0.5);

  
            // Set initial position for pin model
            const positionMap = {
              '1': { x: 3, y: 5.9, z:0, rotation: new THREE.Euler(1, 0, 0) },
              '2': { x: 0, y: 2, z:1, rotation: new THREE.Euler(1, 0, 0) },
              '3': { x: 4.5, y: 1.5, z:1.3, rotation: new THREE.Euler(1, 0, 0) },
              '4': { x: 8.5 , y: 0, z:2, rotation: new THREE.Euler(1, 0, 0) },
              '5': { x: 3, y: -2.8 , z:2.8, rotation: new THREE.Euler(0.6, 0, 0) },
              '6': { x: 12, y: 3.5, z:0.5, rotation: new THREE.Euler(1, 0, 0) },
            };
  
            const { x, y, z, rotation } = positionMap[clickedObject.name];
            pinModel.position.set(x, y+10, z); // Start position above the clicked object
            pinModel.rotation.copy(rotation);
            scene.add(pinModel);
  
            // Animate the pin dropping down
            new TWEEN.Tween(pinModel.position)
              .to({ x: x, y: y, z: z }, 1000) // Adjust duration as needed
              .easing(TWEEN.Easing.Bounce.Out)
              .start();
          });
        } else if (pinnedSegment === clickedObject) {
          // Second click: Perform the zoom-in animation and redirect
          const clickedPosition = new THREE.Vector3().setFromMatrixPosition(clickedObject.matrixWorld);
          const direction = new THREE.Vector3().subVectors(camera.position, clickedPosition).normalize();
          const targetPosition = clickedPosition.add(direction.multiplyScalar(2)); // Adjust the scalar for zoom level
  
          // Tween to move the camera towards the clicked object
          new TWEEN.Tween(camera.position)
            .to({ x: targetPosition.x, y: targetPosition.y-0.5, z: targetPosition.z }, 1000)
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
                navigate('/timeline'); // Route to '/north'
                break;
              case '2':
                navigate('/timeline'); // Route to '/west'
                break;
              case '3':
                navigate('/timeline'); // Route to '/central'
                break;
              case '4':
                navigate('/timeline'); // Route to '/east'
                break;
              case '5':
                navigate('/timeline'); // Route to '/south'
                break;
              case '6':
                navigate('/timeline'); // Route to '/northeast'
                break;
              default:
                break;
            }
          }).start();
        } else {
          // If the user clicks on a different segment, update the pin model position
          scene.remove(pinModel);
          pinnedSegment = null;
          onDocumentClick(event); // Retry to pin the new segment
        }
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
  
      {/* 3D Model Container */}
      <div ref={containerRef} className="threejs-container" />
  
      {/* Info Container */}
      <div id="info-container"></div>
  
      {/* Renderer Container */}
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default ThreeDModel;
