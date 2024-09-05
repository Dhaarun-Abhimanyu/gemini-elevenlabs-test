import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import InputBox from '../components/InputBox';
import AudioIndicator from '../components/AudioIndicator'; // Import the AudioIndicator component

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false); // State to track audio playing status

    const addMessage = (text, sender, audio = null) => {
        setMessages(prevMessages => [...prevMessages, { text, sender, audio }]);
    };

    const handleSendMessage = async (message) => {
        // Add the user's message to the chat
        addMessage(message, 'User');

        try {
            // Send the message to the backend and get the bot's response
            const response = await fetch('/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: message }),
            });
            const json = await response.json();

            console.log('Server response:', json); // Debugging line

            if (response.ok) {
                // Add the bot's response and audio to the chat
                addMessage(json.msg, 'Kattabomman', json.audio);

                // Play the audio if it exists
                if (json.audio) {
                    const audio = new Audio(`data:audio/wav;base64,${json.audio}`);
                    setIsPlaying(true); // Show the image when audio starts
                    audio.play()
                        .then(() => {
                            // Hide the image when audio ends
                            audio.addEventListener('ended', () => setIsPlaying(false));
                        })
                        .catch(error => {
                            console.error('Audio playback error:', error);
                            setIsPlaying(false); // Hide the image in case of error
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
        <div className="chatpage flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="chat-window bg-white shadow-md p-4 rounded-lg w-full max-w-3xl overflow-y-auto flex-grow">
                <ChatWindow messages={messages} />
            </div>
            <div className="inputbox mt-4 w-full max-w-3xl relative">
                <AudioIndicator isPlaying={isPlaying} /> {/* Include the AudioIndicator */}
                <InputBox onSend={handleSendMessage} />
            </div>
        </div>
    );
};

export default Chat;
