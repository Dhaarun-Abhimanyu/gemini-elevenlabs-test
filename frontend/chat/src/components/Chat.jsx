import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import InputBox from '../components/InputBox';

const Chat = () => {
    const [messages, setMessages] = useState([]);

    const addMessage = (text, sender, audio = null) => {
        setMessages(prevMessages => [...prevMessages, { text, sender, audio }]);
    };

    const handleSendMessage = async (message) => {
        // Add the user's message to the chat
        addMessage(message, 'User');
        let loading = 0;
        try {
            loading = 1;
            // Send the message to the backend and get the bot's response
            const response = await fetch('/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: message }),
            });
            const json = await response.json();
            loading = 0;
            console.log('Server response:', json); // Debugging line

            if (response.ok) {
                // Add the bot's response and audio to the chat
                addMessage(json.msg, 'Kattabomman', json.audio);

                // Play the audio if it exists
                if (json.audio) {
                    const audio = new Audio(`data:audio/wav;base64,${json.audio}`);
                    audio.play()
                        .catch(error => {
                            console.error('Audio playback error:', error);
                        });
                }
            } else {
                console.error(json.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <ChatWindow messages={messages} />
            </div>
            <div>
                <InputBox onSend={handleSendMessage} />
            </div>
        </div>
    );
};

export default Chat;