import React from 'react';

const InfoBox = ({ item, style }) => {
  const { title1, description1,title2,description2,title3,description3, image } = item;

  return (
    <div className="info-box" style={style}>
      <div className="info-box-content">
        <img src={image} alt={title1} className="info-box-image" />
        <div className="info-box-text">
          <br />
          <h2>{title1}</h2>
          <p>{description1}</p>
          <br />
          <h2>{title2}</h2>
          <p>{description1}</p>
          <br />
          <h2>{title1}</h2>
          <p>{description1}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
