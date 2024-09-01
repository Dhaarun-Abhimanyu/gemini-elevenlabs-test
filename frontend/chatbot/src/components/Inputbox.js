import { useState } from 'react';

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
            className="input-box flex items-center p-2 bg-white border-t border-gray-200 shadow-md"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Enter your prompt here..."
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Send
            </button>
            {error && <div className="error text-red-500 mt-2">{error}</div>}
        </form>
    );    
};

export default InputBox;