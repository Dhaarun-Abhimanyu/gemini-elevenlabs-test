import React from 'react';

const Avatar = () => {
    return (
        <div className="avatar absolute bottom-0 right-0 mb-4 mr-4">
            <img
                src="/avatar.png"
                alt="Avatar"
                className="w-16 h-16 rounded-full animate-pop"
            />
        </div>
    );
};

export default Avatar;
