import React, { useEffect, useRef } from 'react';
import Message from './Message.jsx';
import './styles.css';

const ChatWindow = ({ messages }) => {
    // Ref to the messages container
    const messagesEndRef = useRef(null);

    // Scroll to the bottom function
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // useEffect to scroll to bottom whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="chat-window">
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <Message key={index} sender={msg.sender} text={msg.text} />
                ))}
                {/* Dummy div to scroll to */}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default ChatWindow;
