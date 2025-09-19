import React, { useEffect } from 'react';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    prompt: string;
    onNext: () => void;
    onPrev: () => void;
    canGoNext: boolean;
    canGoPrev: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
    isOpen, 
    onClose, 
    imageSrc,
    prompt,
    onNext,
    onPrev,
    canGoNext,
    canGoPrev
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && canGoNext) onNext();
            if (e.key === 'ArrowLeft' && canGoPrev) onPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, onNext, onPrev, canGoNext, canGoPrev]);

    if (!isOpen) {
        return null;
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageSrc;
        const safePrompt = prompt.slice(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        link.download = `ai-image-${safePrompt}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 animate-fade-in-fast"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
        >
            {/* Close button */}
            <button 
                className="absolute top-4 right-4 text-white text-4xl hover:text-teal-400 transition-colors z-50"
                onClick={onClose}
                aria-label="Close image viewer"
            >
                &times;
            </button>
            
            {/* Main content */}
            <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
                <img src={imageSrc} alt={prompt} className="w-full h-full object-contain rounded-lg shadow-2xl" />
            </div>

            {/* Navigation */}
            {canGoPrev && (
                <button
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-gray-800/50 p-3 rounded-full text-white hover:bg-teal-500 transition-colors"
                    onClick={onPrev}
                    aria-label="Previous image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}
            {canGoNext && (
                <button
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-gray-800/50 p-3 rounded-full text-white hover:bg-teal-500 transition-colors"
                    onClick={onNext}
                    aria-label="Next image"
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}

             {/* Actions */}
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-gray-900/60 backdrop-blur-sm p-3 rounded-full">
                <button
                    onClick={handleDownload}
                    className="text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500"
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

export default ImageModal;