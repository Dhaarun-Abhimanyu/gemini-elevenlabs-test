// AudioIndicator.js
import React from 'react';

const AudioIndicator = ({ isPlaying }) => {
    return (
        <div className={`audio-indicator ${isPlaying ? 'visible' : 'hidden'}`}>
            <img src="\pandiyan.png" alt="no Audio Playing" className="w-8 h-8" />
        </div>
    );
};

export default AudioIndicator;
