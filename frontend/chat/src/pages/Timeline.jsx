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
    { title1: 'Event 1',description1: 'Sai joined the meeting.',title2:'hello', description2: 'Sai joined the meeting.',title3:'hello', description3: 'Sai joined the meeting.', year: '1650-1700', image: "src/assets/1650-1700.png" ,link: 'page1'},
    { title1: 'Event 1',description1: 'Sai joined the meeting.',title2:'hello', description2: 'Sai joined the meeting.',title3:'hello', description3: 'Sai joined the meeting.', year: '1700-1750', image: "src/assets/1650-1700.png" ,link: 'page3'},
    { title1: 'Event 1',description1: 'Sai joined the meeting.',title2:'hello', description2: 'Sai joined the meeting.',title3:'hello', description3: 'Sai joined the meeting.', year: '1750-1800', image: "src/assets/1650-1700.png" ,link: 'characters'},
    { title1: 'Event 1',description1: 'Sai joined the meeting.',title2:'hello', description2: 'Sai joined the meeting.',title3:'hello', description3: 'Sai joined the meeting.', year: '1800-1850', image: "src/assets/1650-1700.png" ,link: 'page1'},
    { title1: 'Event 1',description1: 'Sai joined the meeting.',title2:'hello', description2: 'Sai joined the meeting.',title3:'hello', description3: 'Sai joined the meeting.', year: '1850-1900', image: "src/assets/1650-1700.png" ,link: 'page1'},
  ];

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
    left: hoveredIndex !== null && hoveredIndex % 2 === 0 ? '40px' : 'auto',
    right: hoveredIndex !== null && hoveredIndex % 2 !== 0 ? '40px' : 'auto',
    width: '50%',
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
                transform: 'translateY(-50%)',
                left: index % 2 === 0 ? '-100px' : 'auto',
                right: index % 2 !== 0 ? '-100px' : 'auto',
                opacity: 1,
                whiteSpace: 'nowrap',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
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
