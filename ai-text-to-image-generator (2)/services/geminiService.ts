import { GoogleGenAI } from "@google/genai";
import { QUALITY_PROMPT_ENHANCERS } from '../constants';
import type { AspectRatio, ImageQuality } from '../types';

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set. Please ensure it is configured.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateImagesFromPrompt = async (
    prompt: string,
    numberOfImages: number,
    quality: ImageQuality,
    aspectRatio: AspectRatio
): Promise<string[]> => {
    try {
        const enhancedPrompt = `${prompt}${QUALITY_PROMPT_ENHANCERS[quality]}`;

        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: enhancedPrompt,
            config: {
                numberOfImages: numberOfImages,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio,
            },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("API did not return any images. The prompt might be too restrictive or violate safety policies.");
        }

        const imageSrcs = response.generatedImages.map(img => {
            const base64ImageBytes = img.image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        });

        return imageSrcs;

    } catch (error) {
        console.error("Error generating images:", error);
        if (error instanceof Error) {
            if (error.message.includes('safety')) {
                 throw new Error(`Generation failed due to safety policies. Please modify your prompt.`);
            }
            throw new Error(`Failed to generate images: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating images.");
    }
};