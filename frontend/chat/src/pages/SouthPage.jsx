import React from 'react';
import ThreeDScene from '../components/temple';
import Chat from './Chat'; // Adjust the import path as necessary

const SouthPage = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <ThreeDScene />
      </div>
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '50%', 
        height: '50%', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Chat />
      </div>
    </div>
  );
};

export default SouthPage;