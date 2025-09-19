import type { ImageCount, ImageQuality, AspectRatio } from './types';

export const SAMPLE_PROMPTS: string[] = [
  'A majestic lion with a fiery mane, standing on a rocky cliff at sunset.',
  'A futuristic cityscape with flying cars and holographic advertisements, in the style of cyberpunk art.',
  'A cozy, enchanted forest with glowing mushrooms and whimsical creatures.',
  'A cute, fluffy puppy wearing a tiny superhero cape, ready to save the day.',
  'An epic fantasy castle perched on a mountain peak, surrounded by dragons.',
  'A serene underwater scene with colorful coral reefs and diverse marine life.',
  'A photorealistic portrait of an astronaut floating in space, with Earth reflected in their helmet.',
  'A delicious-looking pizza with extra cheese, rendered in a hyper-realistic style.',
  'An abstract painting representing the feeling of joy, with vibrant colors and dynamic shapes.'
];

export const IMAGE_COUNTS: ImageCount[] = [1, 2, 4, 6];

export const IMAGE_QUALITIES: ImageQuality[] = ['Low', 'Medium', 'High', 'Ultra HD'];

export const ASPECT_RATIOS: AspectRatio[] = ['1:1', '3:4', '4:3', '9:16', '16:9'];

export const QUALITY_PROMPT_ENHANCERS: Record<ImageQuality, string> = {
    'Low': ', low quality, jpeg artifacts',
    'Medium': '',
    'High': ', high quality, sharp focus, detailed',
    'Ultra HD': ', ultra realistic, 8k, photorealistic, sharp focus, intricate details'
};