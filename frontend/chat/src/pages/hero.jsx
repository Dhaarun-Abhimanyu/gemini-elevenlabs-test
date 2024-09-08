import React from 'react';
import { useNavigate } from 'react-router-dom';
import './hero.css';  // Make sure to create and import your CSS file

const HeroesGallery = () => {
  const navigate = useNavigate();

  return (
    <div className="heroes-container">
      <button className="back-button" onClick={() => navigate(-1)}>
      ← Back</button>
      <div className="tagline">
        "Legends who shaped history with courage and honor"
      </div>
      <div className="gallery">
        {[
          { id: 1, name: 'Shivaji', path: '/south', image: 'pandiyan.png' },
          { id: 2, name: 'Hero 2', path: '/hero2', image: 'pandiyan.png' },
          { id: 3, name: 'Hero 3', path: '/hero3', image: 'pandiyan.png' },
          { id: 4, name: 'Hero 4', path: '/hero4', image: 'pandiyan.png' },
          { id: 5, name: 'Hero 5', path: '/hero5', image: 'pandiyan.png' },
          { id: 6, name: 'Hero 6', path: '/hero6', image: 'pandiyan.png' }
        ].map(hero => (
          <div className="hero" key={hero.id} onClick={() => navigate(hero.path)}>
            <img src={hero.image} alt={hero.name} />
            <h3>{hero.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroesGallery;
