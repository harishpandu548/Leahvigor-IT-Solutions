const { GoogleGenAI } = require('@google/genai');

async function run() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [{ role: 'user', parts: [{ text: 'hello' }] }],
      config: {
        systemInstruction: "You are a bot",
        temperature: 0.3,
      }
    });
    console.log("Success:", response.text);
  } catch (e) {
    console.error("Error:", e);
  }
}
run();
