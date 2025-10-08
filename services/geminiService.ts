import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// --- API Key Configuration ---
// The API key is sourced from the `API_KEY` environment variable.
// This must be configured in the deployment environment (e.g., Vercel, Netlify).
//
// IMPORTANT SECURITY NOTICE:
// Using API keys on the client-side is not recommended for production applications
// as they can be exposed. For a personal portfolio, this risk may be acceptable.
// For more secure applications, use a backend proxy to handle API calls.

let ai: GoogleGenAI | null = null;

try {
    // Initialize the GoogleGenAI client using the environment variable.
    // The guidelines mandate using `process.env.API_KEY`. The build/deployment
    // environment must make this variable available to the client-side code.
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} catch (e) {
    // This will catch errors during initialization, e.g., if the key is structurally invalid.
    console.error("Error initializing GoogleGenAI. The API key may be malformed or missing from environment variables.", e);
}

const systemInstruction = `You are a friendly and helpful AI assistant for Ajith Kumar's personal portfolio website. Your goal is to answer questions about Ajith, his skills, projects, and experience based on the context of a software developer portfolio. Be professional, concise, and encourage users to get in touch with Ajith via the contact form for more detailed inquiries. Do not make up information that is not typically found in a portfolio. Keep your answers conversational and brief.`;

export const generateChatResponse = async (prompt: string): Promise<string> => {
  // If the AI client failed to initialize (e.g., missing API key), return a helpful error message.
  if (!ai) {
    return "The AI chat is not configured. The site owner needs to set the `API_KEY` environment variable in their deployment settings to enable this feature.";
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 1,
        topK: 1,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('API key is missing'))) {
       return "The AI chat is currently unavailable due to an invalid or missing API key. The site owner needs to check the configuration in the deployment environment.";
    }
    return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
  }
};
