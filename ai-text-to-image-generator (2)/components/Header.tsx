
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center my-8 md:my-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                AI Text-to-Image Generator
            </h1>
            <p className="text-gray-400 mt-2 text-lg">Bring your imagination to life with Gemini</p>
        </header>
    );
};

export default Header;
