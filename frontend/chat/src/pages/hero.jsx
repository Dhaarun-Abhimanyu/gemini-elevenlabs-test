import React from 'react';
import './hero.css'; // Ensure this path is correct relative to your project structure
import { useNavigate } from 'react-router-dom'; // For navigation

const Heroes = () => {
  const navigate = useNavigate();

  return (
    <div className="heroes-container">
      <div className="gallery">
        <div className="hero" onClick={() => navigate('/south')}>
          <img src="pandiyan.png" alt="Hero 1" />
          <h3>Shivaji</h3>
        </div>
        <div className="hero" onClick={() => navigate('/hero2')}>
          <img src="pandiyan.png" alt="Hero 2" />
          <h3>Hero 2</h3>
        </div>
        <div className="hero" onClick={() => navigate('/hero3')}>
          <img src="pandiyan.png" alt="Hero 3" />
          <h3>Hero 3</h3>
        </div>
        <div className="hero" onClick={() => navigate('/hero4')}>
          <img src="pandiyan.png" alt="Hero 4" />
          <h3>Hero 4</h3>
        </div>
        <div className="hero" onClick={() => navigate('/hero5')}>
          <img src="pandiyan.png" alt="Hero 5" />
          <h3>Hero 5</h3>
        </div>
        <div className="hero" onClick={() => navigate('/hero6')}>
          <img src="pandiyan.png" alt="Hero 6" />
          <h3>Hero 6</h3>
        </div>
      </div>
    </div>
  );
};

export default Heroes;