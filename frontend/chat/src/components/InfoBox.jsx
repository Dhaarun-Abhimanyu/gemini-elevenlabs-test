import React from 'react';

const InfoBox = ({ item, style }) => {
  const { title1, description1,title2,description2,title3,description3, image } = item;

  return (
    <div className="info-box" style={style}>
      <div className="info-box-content">
        <img src={image} alt={title1} className="info-box-image" />
        <div className="info-box-text">
          <br />
          <h3>{title1}</h3>
          <p>{description1}</p>
          <br />
          <h3>{title2}</h3>
          <p>{description2}</p>
          <br />
          <h3>{title3}</h3>
          <p>{description3}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
