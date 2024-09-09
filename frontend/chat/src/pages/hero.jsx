import React from 'react';
import { useNavigate } from 'react-router-dom';
import './hero.css'; 

const HeroesGallery = () => {
  const navigate = useNavigate();

  return (
    <div className="heroes-container">
   
      <div className="tagline">
        "Legends who shaped history with courage and honor"
      </div>
      <div className="gallery">
        {[
         { id: 1, name: 'Kattabomman', path: '/south', image: '/pandiyan.png' },
          { id: 2, name: 'Puli thevar', path: '/south', image: '/puli thevar.jpg' },
          { id: 3, name: 'Maruthu brothers', path: '/south', image: '/maruthu brothers.jpg' },
          { id: 4, name: 'Dheeran chinnamalai', path: '/south', image: '/dheeran.jpg' },
          { id: 5, name: 'Velunachiyar', path: '/south', image: '/velu.jpg' },
          { id: 6, name: 'Hero 6', path: '/hero6', image: 'pandiyan.png' }
        ].map(hero => (
          <div className="hero" key={hero.id} onClick={() => navigate(hero.path, { state: { heroName: hero.name } })}>
            <img src={hero.image} alt={hero.name} />
            <h3>{hero.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroesGallery;
