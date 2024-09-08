import { useState } from 'react';
import handleSendMessage from './Chat'
const InputBox = ({ onSend }) => {
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
            className="input-field "
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Enter your prompt here..."
                className="input-box"
            />
            <button
                type="submit"
                className="send-button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    );    
};

export default InputBox;