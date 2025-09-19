import React from 'react';

interface ImageCardProps {
    src: string;
    prompt: string;
    index: number;
    onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, prompt, index, onClick }) => {
    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent modal from opening when clicking download
        const link = document.createElement('a');
        link.href = src;
        const safePrompt = prompt.slice(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        link.download = `ai-image-${safePrompt}-${index + 1}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div 
            className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-800 transition-transform duration-300 hover:scale-105 cursor-pointer aspect-square"
            onClick={onClick}
            onKeyPress={(e) => e.key === 'Enter' && onClick()}
            tabIndex={0}
            role="button"
            aria-label={`View generated image ${index + 1} for prompt: ${prompt}`}
        >
            <img src={src} alt={prompt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center p-4">
                <button
                    onClick={handleDownload}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-teal-500 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500"
                    aria-label={`Download image ${index + 1}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Download</span>
                </button>
            </div>
        </div>
    );
};

export default ImageCard;