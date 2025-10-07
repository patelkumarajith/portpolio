import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// --- API Key Configuration ---
// The API key provided by the user has been added here to make the chat functional.
//
// IMPORTANT SECURITY NOTICE:
// Storing an API key directly in your website's code (client-side) is not secure.
// Anyone who visits your site can potentially find and use your key, which could lead to
// unexpected charges or quota usage. For a personal portfolio, this risk may be acceptable,
// but for a production application, it's highly recommended to use a backend server to handle API calls
// or use environment variables provided by your hosting service (like Vercel).
const GEMINI_API_KEY = "AIzaSyA-AxHfVn7XAfiaFIvFEGyTtorF1wRn14M";

let ai: GoogleGenAI | null = null;

// Initialize the AI client only if a valid key is provided.
if (GEMINI_API_KEY) {
    try {
        ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    } catch (e) {
        console.error("Error initializing GoogleGenAI. The API key may be malformed.", e);
    }
}

const systemInstruction = `You are a friendly and helpful AI assistant for Ajith Kumar's personal portfolio website. Your goal is to answer questions about Ajith, his skills, projects, and experience based on the context of a software developer portfolio. Be professional, concise, and encourage users to get in touch with Ajith via the contact form for more detailed inquiries. Do not make up information that is not typically found in a portfolio. Keep your answers conversational and brief.`;

export const generateChatResponse = async (prompt: string): Promise<string> => {
  // If the AI client failed to initialize, return a helpful error message.
  if (!ai) {
    return "The AI chat is not configured. The site owner needs to add a Gemini API key to enable this feature.";
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
       return "The AI chat is currently unavailable due to an invalid API key. The site owner needs to check the configuration.";
    }
    return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
  }
};