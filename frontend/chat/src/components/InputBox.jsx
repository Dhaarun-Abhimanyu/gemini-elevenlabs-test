import { useState } from 'react';
import handleSendMessage from './Chat'
const InputBox = ({ onSend, isLoading }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setError('Message cannot be empty');
            return;
        }

        setError(null);
        onSend(message);  // Send the message to Chat.js for further processing
        setMessage('');   // Clear the input after sending
    };

    return (
        <form 
            className="input-field"
            onSubmit={handleSubmit}
        >
            <div className = 'contents'>
            <input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Chat with Kattabomman..."
                className="input-box"
                disabled={isLoading}
            />
            
            <button
                type="submit"
                className="send-button"
                disabled={isLoading}
            >
                {!isLoading ? (
                    // SVG for the send button
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
                ) : (
                    // Loading GIF while waiting for a response
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <style>
                        {`
                        .spinner_b2T7{animation:spinner_xe7Q .8s linear infinite}
                        .spinner_YRVV{animation-delay:-.65s}
                        .spinner_c9oY{animation-delay:-.5s}
                        @keyframes spinner_xe7Q{93.75%,100%{r:3px}46.875%{r:.2px}}
                        `}
                    </style>
                    <circle className="spinner_b2T7" cx="4" cy="12" r="3"/>
                    <circle className="spinner_b2T7 spinner_YRVV" cx="12" cy="12" r="3"/>
                    <circle className="spinner_b2T7 spinner_c9oY" cx="20" cy="12" r="3"/>
                </svg>
                )}
                </button>
            </div>
            
            {error && <div className="error">{error}</div>}
        </form>
    );    
};

export default InputBox;