import React from 'react';

const Message = ({ sender, text }) => {
    return (
        <div
            className={`message p-2 my-2 rounded-lg ${
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