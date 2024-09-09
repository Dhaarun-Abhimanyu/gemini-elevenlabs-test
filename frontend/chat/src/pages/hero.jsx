import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './hero.css'; 

const HeroesGallery = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default language

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value); 
  };
  return (
    
    <div className="heroes-container">
      {/* Back Button */}
      <div id="header" >
        <img src="/logo.png" alt="Logo" id="header-logo" />
      </div>
      {/* Language Dropdown */}
      <div className="dropdown-container">
        <select className="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
          <option value="Telugu">Telugu</option>
          <option value="Malayalam">Malayalam</option>
        </select>
      </div>

      {/* Tagline */}
      <div className="tagline">
        "Legends who shaped history with courage and honor"
      </div>

      {/* Gallery */}
      <div className="gallery">
        {[
          { id: 1, name: 'Kattabomman', path: '/south', image: '/pandiyan.png' },
          { id: 2, name: 'Puli thevar', path: '/south', image: '/puli thevar.jpg' },
          { id: 3, name: 'Maruthu brothers', path: '/south', image: '/maruthu brothers.jpg' },
          { id: 4, name: 'Dheeran chinnamalai', path: '/south', image: '/dheeran.jpg' },
          { id: 5, name: 'Velunachiyar', path: '/south', image: '/velu.jpg' },
          { id: 6, name: 'Hyder Ali', path: '/south', image: 'hyder.png' }
        ].map(hero => (
          <div className="hero" key={hero.id} onClick={() => navigate(hero.path, { state: { heroName: hero.name,lang:selectedLanguage } })}>
            <img src={hero.image} alt={hero.name} />
            <h3>{hero.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroesGallery;