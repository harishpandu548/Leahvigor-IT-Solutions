import { GoogleGenAI } from '@google/genai';
import { leahvigorKnowledge } from '@/data/leahvigor-knowledge';

// Initialize the Gemini client securely on the server
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid request", { status: 400 });
    }

    // Basic protection against massive abuse
    if (messages.length > 50) {
      return new Response("Conversation too long", { status: 400 });
    }

    const systemInstruction = `
You are the official website assistant for Leahvigor Solutions.
Your purpose is to help visitors understand Leahvigor's services and determine how Leahvigor may help their business.
Answer using the supplied Leahvigor knowledge.
Never invent company information, pricing, or case studies.
If information is unavailable, say that you don't have that information and offer to connect the visitor with Leahvigor.
Keep responses concise, professional, and conversational.
Give particular importance to Talent Acquisition and Digital Marketing.
Do not ask too many questions at once when gathering leads. Ask naturally, one step at a time.

KNOWLEDGE BASE:
${leahvigorKnowledge}
`;

    // Map client messages to Gemini's expected format
    const formattedMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    // Call the Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedMessages,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // keep responses relatively grounded and factual
      }
    });

    return new Response(JSON.stringify({ text: response.text }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process request." }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
