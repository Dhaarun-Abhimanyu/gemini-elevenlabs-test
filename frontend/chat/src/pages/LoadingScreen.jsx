import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = () => {
  const navigate = useNavigate();

  return (
    <div id="loading-screen">
      <img src="/logo.png" alt="Welcome Logo" id="loading-logo" style={{ marginBottom: '50px' }} />
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <p className="titillium-web-semibold" style={{ marginBottom: '10px' }}>Learn with AI</p>
          <button className='unique-btn'
            onClick={() => navigate('/threedmodel')} // Navigate to 3D model page
           
          >
            LET'S GO!
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p className="titillium-web-semibold" style={{ marginBottom: '10px' }}>Sign up for lessons</p>
          <button 
            onClick={() => {
              // Add logic to redirect to a sign-up page or any other route
            }}
            className='unique-btn'
          >
            LET'S GO!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
