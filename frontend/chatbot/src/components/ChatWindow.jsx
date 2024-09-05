import React from 'react';
import Message from './Message';

const ChatWindow = ({ messages }) => {
    return (
        <div className="chat-window bg-gray-50 p-4 rounded-lg h-96 overflow-y-auto">
            {messages.map((msg, index) => (
                <Message key={index} sender={msg.sender} text={msg.text} />
            ))}
        </div>
    );    
};

export default ChatWindow;