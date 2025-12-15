import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client. 
// Note: In a real production app, you might proxy this through a backend to keep the key secure,
// but for this demo, we use the client-side SDK directly as instructed.
const ai = new GoogleGenAI({ apiKey });

export const getWellnessAdvice = async (userQuery: string): Promise<string> => {
  try {
    if (!apiKey) {
      return "I'm sorry, I can't connect to the wellness database right now. Please check your API configuration.";
    }

    const model = 'gemini-2.5-flash';
    
    // System instruction to guide the persona
    const systemInstruction = `
      You are 'Herbolario AI', a friendly, knowledgeable, and safety-conscious herbalist assistant for a natural health store called 'Herbolario Vida'.
      
      Your goals:
      1. Provide helpful information about herbs, natural remedies, and general wellness.
      2. Suggest types of products that might help (e.g., "Chamomile tea is great for sleep") but do not prescribe medical treatments.
      3. Always include a brief disclaimer that you are an AI and this is not medical advice.
      4. Keep answers concise (under 150 words) and easy to read on a mobile device.
      5. Tone: Warm, nurturing, and professional.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: userQuery,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm having trouble thinking of a response right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently offline. Please check your internet connection or try again later.";
  }
};