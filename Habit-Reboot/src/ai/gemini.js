import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function getMoodAwareAdvice(logs, habits) {
  try {
 
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

    const prompt = `
You are a supportive habit coach.

Habits:
${habits.map(h => `- ${h.name}: ${h.done ? "Done" : "Missed"}`).join("\n")}

Mood history:
${logs.length ? logs.map(l => `- ${l.date}: Mood ${l.mood}`).join("\n") : "No data"}

Give 2 short encouraging sentences.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text();

  } catch (err) {
    console.error("Gemini Error:", err);
    return "Focus on one small win today. Progress beats perfection.";
  }
}