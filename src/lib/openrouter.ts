import OpenAI from 'openai'

// Helper function to check if API key is configured
export const isApiKeyConfigured = (): boolean => {
  return !!import.meta.env.VITE_OPENROUTER_API_KEY
}

// Lazy initialization of OpenAI client with OpenRouter configuration
export const getOpenAIClient = (): OpenAI => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY

  if (!apiKey) {
    throw new Error('VITE_OPENROUTER_API_KEY environment variable is not set')
  }

  return new OpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Course Generator App',
    },
    dangerouslyAllowBrowser: true, // Note: In production, consider using a backend proxy
  })
}
