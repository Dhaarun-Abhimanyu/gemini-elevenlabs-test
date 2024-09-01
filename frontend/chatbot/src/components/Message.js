import React from 'react';

const Message = ({ sender, text }) => {
    return (
        <div
            className={`message p-2 my-2 rounded-lg ${
                sender === 'User'
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-300 text-black self-start'
            }`}
        >
            <strong>{sender}:</strong> {text}
        </div>
    );    
};

export default Message;