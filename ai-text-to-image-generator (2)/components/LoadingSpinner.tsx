import React, { useState, useEffect } from 'react';

const MESSAGES = [
    "Generating masterpieces...",
    "Painting with pixels...",
    "Summoning creative spirits...",
    "Composing your vision...",
    "Turning words into art...",
];

const LoadingSpinner: React.FC = () => {
    const [message, setMessage] = useState(MESSAGES[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessage(prevMessage => {
                const currentIndex = MESSAGES.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % MESSAGES.length;
                return MESSAGES[nextIndex];
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center space-y-4 my-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
            <p className="text-gray-300 text-lg text-center transition-opacity duration-500">{message}</p>
        </div>
    );
};

export default LoadingSpinner;