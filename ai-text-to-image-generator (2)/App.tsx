import React, { useState, useCallback } from 'react';
import { SAMPLE_PROMPTS, IMAGE_COUNTS, IMAGE_QUALITIES, ASPECT_RATIOS } from './constants';
import type { ImageCount, ImageQuality, AspectRatio } from './types';
import { generateImagesFromPrompt } from './services/geminiService';

import Header from './components/Header';
import Controls from './components/Controls';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';
import Gallery from './components/Gallery';
import ImageModal from './components/ImageModal';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [imageCount, setImageCount] = useState<ImageCount>(IMAGE_COUNTS[0]);
    const [imageQuality, setImageQuality] = useState<ImageQuality>(IMAGE_QUALITIES[2]); // Default to 'High'
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>(ASPECT_RATIOS[0]); // Default to '1:1'
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [lastGeneratedPrompt, setLastGeneratedPrompt] = useState<string>('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    const handleSuggestPrompt = useCallback(() => {
        const randomPrompt = SAMPLE_PROMPTS[Math.floor(Math.random() * SAMPLE_PROMPTS.length)];
        setPrompt(randomPrompt);
    }, []);

    const handleGenerateClick = useCallback(async () => {
        if (!prompt.trim()) {
            setError("Please enter a prompt to generate images.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);

        try {
            const images = await generateImagesFromPrompt(prompt, imageCount, imageQuality, aspectRatio);
            setGeneratedImages(images);
            setLastGeneratedPrompt(prompt);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [prompt, imageCount, imageQuality, aspectRatio]);
    
    // Modal handlers
    const openModal = (index: number) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const showNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % generatedImages.length);
    };

    const showPrevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + generatedImages.length) % generatedImages.length);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 md:p-8">
            <div className="container mx-auto max-w-4xl">
                <Header />

                <main>
                    <Controls
                        prompt={prompt}
                        setPrompt={setPrompt}
                        imageCount={imageCount}
                        setImageCount={setImageCount}
                        imageQuality={imageQuality}
                        setImageQuality={setImageQuality}
                        aspectRatio={aspectRatio}
                        setAspectRatio={setAspectRatio}
                        isLoading={isLoading}
                        onGenerate={handleGenerateClick}
                        onSuggest={handleSuggestPrompt}
                    />

                    <div className="mt-8">
                        {isLoading && <LoadingSpinner />}
                        {error && <ErrorAlert message={error} />}
                        <Gallery 
                            images={generatedImages} 
                            prompt={lastGeneratedPrompt} 
                            imageCount={imageCount}
                            onImageClick={openModal}
                            isLoading={isLoading}
                        />
                    </div>
                </main>

                <footer className="text-center mt-12 text-gray-500 text-sm">
                    <p>Powered by Google Gemini. Designed with Tailwind CSS.</p>
                </footer>
            </div>
            {isModalOpen && generatedImages.length > 0 && (
                <ImageModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    imageSrc={generatedImages[selectedImageIndex]}
                    prompt={lastGeneratedPrompt}
                    onNext={showNextImage}
                    onPrev={showPrevImage}
                    canGoNext={generatedImages.length > 1}
                    canGoPrev={generatedImages.length > 1}
                />
            )}
        </div>
    );
};

export default App;