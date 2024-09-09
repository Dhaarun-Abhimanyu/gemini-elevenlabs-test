import React, { useState } from 'react';
import TimelineItem from '../components/TimelineItem';
import { useNavigate } from 'react-router-dom';
import InfoBox from '../components/InfoBox';
import '../components/App.css';

const Timeline = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const timelineData = [
    {
      "title1": "Battle of Gingee (1644-1677)",
      "description1": "Gingee Fort was a strategic stronghold for the Marathas and Mughals, coming under Shivaji's control in the 1670s, playing a key role in the Maratha-Mughal conflict.",
      "title2": "Madurai Nayak Kingdom's Decline",
      "description2": "By the late 17th century, the Madurai Nayak Kingdom declined due to internal conflicts and invasions, leading to regional instability.",
      "title3": "Mysore's Rise under Raja Wodeyar (1638-1673)",
      "description3": "Raja Wodeyar strengthened Mysore, laying the foundation for its future power, which later clashed with the British.",
      "year": "1650-1700",
      "image": "src/assets/1650-1700.png",
      "link": "page1"
    },
    {
      "title1": "Battle of Trichinopoly (1741)",
      "description1": "The Marathas defeated the Nawab of Arcot, securing control over Southern territories in this significant battle.",
      "title2": "Marathas and the Siege of Tanjore (1740)",
      "description2": "Maratha forces seized Tanjore, expanding their influence in Southern India and leading to frequent regional conflicts.",
      "title3": "Nawab of Arcot's Alliance with the British (1740s)",
      "description3": "The Nawab of Arcot allied with the British in the 1740s, marking the beginning of increased British involvement in South Indian politics.",
      "year": "1700-1750",
      "image": "src/assets/1700-1750.png",
      "link": "page3"
    },
    {
      "title1": "Anglo-French Wars and Carnatic Wars (1746-1763)",
      "description1": "The Anglo-French rivalry led to several conflicts in the Carnatic region, ending French influence in India after the Third Carnatic War.",
      "title2": "Hyder Ali's Rule (1761-1782)",
      "description2": "Hyder Ali strengthened Mysore and fought the British in the First and Second Anglo-Mysore Wars.",
      "title3": "Veerapandiya Kattabomman (1799)",
      "description3": "Veerapandiya Kattabomman resisted British taxation, leading to his capture and execution, becoming an early symbol of resistance.",
      "year": "1750-1800",
      "image": "src/assets/1750-1800.png",
      "link": "characters"
    },
    {
      "title1": "Vellore Mutiny (1806)",
      "description1": "The Vellore Mutiny was an early large-scale revolt against British rule, sparked by changes to soldiers' uniforms and religious concerns.",
      "title2": "Third Anglo-Maratha War (1817-1818)",
      "description2": "The Third Anglo-Maratha War led to British expansion in South India, following the defeat of the Marathas.",
      "title3": "Poligar Wars (1799-1805)",
      "description3": "The Poligar Wars were a series of local resistances in Tamil Nadu against British taxation and control, following Kattabomman's execution.",
      "year": "1800-1850",
      "image": "src/assets/1800-1850.png",
      "link": "page1"
    }
    
,  
{
  "title1": "The Indian Rebellion(1857-1858)",
  "description1": "Though the 1857 uprising was mostly in North India, it led to administrative changes in South India, including the end of the East India Company and British Crown rule from 1858.",
  "title2": "Formation of Indian National Congress (1885)",
  "description2": "The Indian National Congress, formed in 1885, saw significant involvement from South Indian leaders and became a hub for political and reformist activities in Madras.",
  "title3": "Formation of Madras Mahajana Sabha (1884)",
  "description3": "The Madras Mahajana Sabha, founded in 1884, was an early political organization that opposed British policies and laid the foundation for the Indian National Congress.",
  "year": "1850-1900",
  "image": "src/assets/1850-1900.png",
  "link": "page1"
}

  ]

  // This function now appends the path to the home route '/'
  const handleCircleClick = (link) => {
    navigate(`/${link}`); // Prepend '/' to each link
  };

  const handleHover = (item, index, event) => {
    setHoveredItem(item);
    setHoveredIndex(index);
    
  };

  const handleLeave = () => {
    setHoveredItem(null);
    setHoveredIndex(null);
  };

  const infoBoxStyles = {
    position: 'fixed',
    left: hoveredIndex !== null && hoveredIndex % 2 === 0 ? '100px' : 'auto',
    right: hoveredIndex !== null && hoveredIndex % 2 !== 0 ? '100px' : 'auto',
    width: '80%',
    height: '70%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    opacity: hoveredItem ? 1 : 0,  // Controls visibility
    transform: hoveredItem ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',  // Animation for entrance
    transition: 'transform 0.4s ease, opacity 0.4s ease',  // Smooth transition
    pointerEvents: hoveredItem ? 'auto' : 'none',  // Prevent interaction when not hovered
  };

  return (
    <div className="timeline-container" style={{ position: 'relative' }}>
      <button className='back-button' onClick={() => navigate(-1)}>&#8592; Back</button>
      <div className="timeline">
        {timelineData.map((item, index) => (
          <div className="timeline-item" key={index}>
            <TimelineItem
              item={item}
              onHover={(event) => handleHover(item, index, event)}
              onLeave={handleLeave}
              onClick={() => handleCircleClick(item.link)} // Handle click with updated links
            />
            <span
              style={{
                position: 'absolute',
                top: '50%',
                transform: `translateY(-50%) ${
                  hoveredIndex === index
                    ? index % 2 !== 0
                      ? 'translateX(20px)'  // Move right for left-side circles
                      : 'translateX(-20px)'  // Move left for right-side circles
                    : ''
                }scale(${hoveredIndex === index ? 1.35 : 1})`,
                left: index % 2 === 0 ? '-120px' : 'auto',
                right: index % 2 !== 0 ? '-120px' : 'auto',
                opacity: 1,
                whiteSpace: 'nowrap',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                transition: 'transform 0.5s ease',
              }}
            >
              {item.year}
            </span>
          </div>
        ))}
      </div>

      {hoveredItem && (
        <InfoBox item={hoveredItem} style={infoBoxStyles} />
      )}
    </div>
  );
};

export default Timeline;
