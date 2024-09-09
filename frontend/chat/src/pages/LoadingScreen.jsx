import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = () => {
  const navigate = useNavigate();

  return (
    <div id="loading-screen">
      <img src="/logo.png" alt="Welcome Logo" id="loading-logo" style={{ marginBottom: '50px' }} />
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '10px' }}>Learn with AI</p>
          <button 
            onClick={() => navigate('/threedmodel')} // Navigate to 3D model page
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          >
            LET'S GO!
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '10px' }}>Sign up for lessons</p>
          <button 
            onClick={() => {
              // Add logic to redirect to a sign-up page or any other route
            }}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          >
            LET'S GO!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
