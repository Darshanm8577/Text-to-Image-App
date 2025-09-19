import React from 'react';
import { IMAGE_COUNTS, IMAGE_QUALITIES, ASPECT_RATIOS } from '../constants';
import type { ImageCount, ImageQuality, AspectRatio } from '../types';

interface ControlsProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    imageCount: ImageCount;
    setImageCount: (count: ImageCount) => void;
    imageQuality: ImageQuality;
    setImageQuality: (quality: ImageQuality) => void;
    aspectRatio: AspectRatio;
    setAspectRatio: (ratio: AspectRatio) => void;
    isLoading: boolean;
    onGenerate: () => void;
    onSuggest: () => void;
}

const Controls: React.FC<ControlsProps> = ({
    prompt,
    setPrompt,
    imageCount,
    setImageCount,
    imageQuality,
    setImageQuality,
    aspectRatio,
    setAspectRatio,
    isLoading,
    onGenerate,
    onSuggest
}) => {
    return (
        <div className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-700 space-y-6 transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <div className="relative">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A futuristic city on Mars, cinematic lighting..."
                    className="w-full h-28 p-4 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    disabled={isLoading}
                    aria-label="Image generation prompt"
                />
                 <button
                    onClick={onSuggest}
                    disabled={isLoading}
                    className="absolute bottom-3 right-3 bg-gray-700 text-gray-300 text-xs font-semibold py-1 px-3 rounded-full hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Suggest a random prompt"
                >
                    Suggest Prompt ✨
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="image-count" className="block text-sm font-medium text-gray-400 mb-2">Number of Images</label>
                    <select
                        id="image-count"
                        value={imageCount}
                        onChange={(e) => setImageCount(Number(e.target.value) as ImageCount)}
                        className="w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        disabled={isLoading}
                    >
                        {IMAGE_COUNTS.map(count => <option key={count} value={count}>{count}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="image-quality" className="block text-sm font-medium text-gray-400 mb-2">Image Quality</label>
                    <select
                        id="image-quality"
                        value={imageQuality}
                        onChange={(e) => setImageQuality(e.target.value as ImageQuality)}
                        className="w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        disabled={isLoading}
                    >
                        {IMAGE_QUALITIES.map(quality => <option key={quality} value={quality}>{quality}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="aspect-ratio" className="block text-sm font-medium text-gray-400 mb-2">Aspect Ratio</label>
                    <select
                        id="aspect-ratio"
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                        className="w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        disabled={isLoading}
                    >
                        {ASPECT_RATIOS.map(ratio => <option key={ratio} value={ratio}>{ratio}</option>)}
                    </select>
                </div>
            </div>
            <button
                onClick={onGenerate}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-4 px-4 rounded-lg text-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-100"
                aria-live="polite"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating...</span>
                    </>
                ) : (
                    <span>Generate Images</span>
                )}
            </button>
        </div>
    );
};

export default Controls;