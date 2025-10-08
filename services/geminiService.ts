import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// --- API Key Configuration ---
// FIX: Refactored to use environment variables for the API key, removing the hardcoded key.
// This resolves the TypeScript error from comparing two literal strings and improves security.
// The API key is sourced from the `process.env.API_KEY` environment variable.
// This is a secure practice and assumes the key is set in the deployment environment.
const apiKey = process.env.API_KEY;


// --- Gemini AI Client Initialization ---
let ai: GoogleGenAI | null = null;

// Check if a valid API key has been provided from environment variables.
if (apiKey) {
    try {
        // Initialize the GoogleGenAI client with your key.
        ai = new GoogleGenAI({ apiKey });
    } catch (e) {
        console.error("Error initializing GoogleGenAI. The API key may be malformed.", e);
        ai = null; // Ensure AI client is null if initialization fails.
    }
} else {
    // This warning will appear in the developer console if the key isn't set.
    console.warn("Gemini API key not found. Please set the API_KEY environment variable to enable the AI chat feature.");
}

const systemInstruction = `You are a friendly and helpful AI assistant for Ajith Kumar's personal portfolio website. Your goal is to answer questions about Ajith, his skills, projects, and experience based on the context of a software developer portfolio. Be professional, concise, and encourage users to get in touch with Ajith via the contact form for more detailed inquiries. Do not make up information that is not typically found in a portfolio. Keep your answers conversational and brief.`;

export const generateChatResponse = async (prompt: string): Promise<string> => {
  // If the AI client failed to initialize (e.g., missing API key), return a helpful error message.
  if (!ai) {
    // This message is shown in the chat window to the site owner.
    return "The AI chat is currently not configured. If you are the site owner, please ensure the Gemini API key is set as an environment variable to activate this feature.";
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
       return "The AI chat is currently unavailable due to an invalid API key. The site owner needs to check the API key environment variable.";
    }
    return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
  }
};
