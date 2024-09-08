import React, { useState, useEffect } from 'react';
import ThreeDScene from '../components/temple';
import Chat from '../components/Chat'; // Adjust the import path as necessary

const SouthPage = () => {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChat(true);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Full screen 3D background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <ThreeDScene />
      </div>

      {/* Chat window container */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '48%', 
        transform: 'translate(-50%, -50%)', 
        width: '100%', 
        maxWidth: '480px',   // Set a max-width for better scaling on large screens
        height: '70%',       // Occupy 70% of the vertical space
        backgroundColor: 'rgba(255, 255, 255, 0.5)',  // Slightly more opaque for readability
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',   // Subtle shadow for depth
        borderRadius: '20px',  // Smooth, rounded corners
        overflow: 'hidden',    // Ensure chat content doesn't overflow
        display: 'flex', 
        flexDirection: 'column',  // Arrange chat window and input vertically
        justifyContent: 'center', 
        alignItems: 'center', 
        padding:'0px' ,  // Add padding inside the chat box
        opacity: showChat ? 1 : 0,  // Apply opacity based on state
        transition: 'opacity 1s ease-in-out'  // Smooth transition for opacity
      }}>
        {showChat && <Chat />}
      </div>
    </div>
  );
};

export default SouthPage;


