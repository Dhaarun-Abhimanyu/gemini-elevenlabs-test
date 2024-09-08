import React from 'react';

const InfoBox = ({ item, style }) => {
  const { title, description, image } = item;

  return (
    <div className="info-box" style={style}>
      <div className="info-box-content">
        <img src={image} alt={title} className="info-box-image" />
        <div className="info-box-text">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
