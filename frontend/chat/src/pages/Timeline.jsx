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
    { title: 'Event 1', description: 'Sai joined the meeting.', year: '1650-1700', image: "src/assets/Screenshot (6).png" ,link: 'page1'},
    { title: 'Event 2', description: 'Darshan flexing his muscules.', year: '1701-1750', image: "src/assets/Screenshot (9).png" ,link: 'page2'},
    { title: 'Event 3', description: 'Sai admiring the beauty of Naren.', year: '1751-1800', image: "src/assets/Screenshot (12).png" ,link: 'south'},
    { title: 'Event 4', description: 'Beluga playing BOPZ.', year: '1801-1850', image: "src/assets/Screenshot (46).png", link: 'page4' },
    { title: 'Event 5', description: 'Communism at its peak.', year: '1851-1900', image: "src/assets/Screenshot (58).png", link: 'page5' },
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
    left: hoveredIndex !== null && hoveredIndex % 2 === 0 ? '200px' : 'auto',
    right: hoveredIndex !== null && hoveredIndex % 2 !== 0 ? '200px' : 'auto',
    width: '300px',
    height: '400px',
    padding: '20px',
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
      <button className='button'>&#8592;</button>
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
