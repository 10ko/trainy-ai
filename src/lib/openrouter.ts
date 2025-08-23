import OpenAI from 'openai';

// Initialize OpenAI client with OpenRouter configuration
export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': window.location.origin,
    'X-Title': 'Course Generator App',
  },
  dangerouslyAllowBrowser: true, // Note: In production, consider using a backend proxy
});

// Helper function to check if API key is configured
export const isApiKeyConfigured = (): boolean => {
  return !!import.meta.env.VITE_OPENROUTER_API_KEY;
};

// Helper function to get available models
export const getAvailableModels = async () => {
  try {
    const response = await openai.models.list();
    return response.data;
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
};
