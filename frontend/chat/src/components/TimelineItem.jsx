import React from 'react';

const TimelineItem = ({ item, onClick, onHover, onLeave  }) => {
  return (
    <div
      className="timeline-item"
      
    >
      <div className="circle"
      onMouseEnter={(event) => onHover(item, event)}
      onMouseLeave={onLeave}
      onClick={onClick}  
      style={{ cursor: 'pointer' }}  
      >
      
      </div>
      
    </div>
    
  );
};

export default TimelineItem;
