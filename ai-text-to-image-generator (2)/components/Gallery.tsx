import React from 'react';
import ImageCard from './ImageCard';
import type { ImageCount } from '../types';

interface GalleryProps {
    images: string[];
    prompt: string;
    imageCount: ImageCount;
    onImageClick: (index: number) => void;
    isLoading: boolean;
}

// A more responsive grid layout
const gridColsMap: { [key in ImageCount]: string } = {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    4: 'sm:grid-cols-2',
    6: 'sm:grid-cols-2 lg:grid-cols-3', 
};

const Gallery: React.FC<GalleryProps> = ({ images, prompt, imageCount, onImageClick, isLoading }) => {
    
    // Empty state before any generation
    if (!isLoading && images.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-gray-800/30 rounded-2xl border-2 border-dashed border-gray-700 mt-8">
                <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-xl font-medium text-gray-300">Your gallery is empty</h3>
                <p className="mt-1 text-sm text-gray-500">Enter a prompt and click "Generate" to see the magic happen.</p>
            </div>
        )
    }

    if (images.length === 0) {
        return null;
    }
    
    return (
        <div className="mt-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-300 mb-6 truncate">
                Results for: <span className="text-teal-400">"{prompt}"</span>
            </h2>
            <div className={`grid grid-cols-1 ${gridColsMap[imageCount]} gap-6`}>
                {images.map((src, index) => (
                    <ImageCard 
                        key={index} 
                        src={src} 
                        prompt={prompt} 
                        index={index}
                        onClick={() => onImageClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Gallery;