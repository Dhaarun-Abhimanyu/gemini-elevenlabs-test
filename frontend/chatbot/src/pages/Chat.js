import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import InputBox from '../components/InputBox';
import Avatar from '../components/Avatar';  // Import the Avatar component

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [botResponded, setBotResponded] = useState(false); // State to track bot response

    const addMessage = (text, sender, audio = null) => {
        setMessages(prevMessages => [...prevMessages, { text, sender, audio }]);
    };

    const handleSendMessage = async (message) => {
        addMessage(message, 'User');
        setBotResponded(false); // Reset the avatar visibility when the user sends a message

        try {
            const response = await fetch('/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: message }),
            });
            const json = await response.json();

            if (response.ok) {
                addMessage(json.msg, 'Kattabomman', json.audio);
                setBotResponded(true); // Show the avatar when the bot responds
                setTimeout(() => {
                    setBotResponded(false);
                }, 5000);

                // Play the audio if it exists
                if (json.audio) {
                    const audio = new Audio(`data:audio/wav;base64,${json.audio}`);
                    audio.play().catch(error => console.error('Audio playback error:', error));
                }
            } else {
                console.error(json.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="chatpage relative flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="chat-window bg-white shadow-md p-4 rounded-lg w-full max-w-3xl overflow-y-auto flex-grow">
                <ChatWindow messages={messages} />
            </div>
            <div className="inputbox mt-4 w-full max-w-3xl">
                <InputBox onSend={handleSendMessage} />
            </div>
            {/* Conditionally render the Avatar component */}
            {botResponded && <Avatar />}
        </div>
    );
};



export default Chat;
