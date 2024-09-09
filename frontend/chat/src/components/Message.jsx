import React from 'react';
import './styles.css'
const Message = ({ sender, text }) => {
    return (
        <div
            className={`message ${
                sender === 'User'
                    ? 'user-message'
                    : 'bot-message'
            }`}
        >
            <strong>{sender}:</strong> {text}
        </div>
    );    
};

export default Message;