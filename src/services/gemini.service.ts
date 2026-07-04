import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const calculateCompatibility = async (
  tenantProfile: any,
  listing: any
) => {
  try {
    const prompt = `
Compare the following tenant profile and rental listing.

Tenant:
${JSON.stringify(tenantProfile)}

Listing:
${JSON.stringify(listing)}

Return ONLY valid JSON in this format:
{
  "score": 85,
  "explanation": "Short explanation"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text ?? "";

    return JSON.parse(text);
  } catch (error) {
    console.error(error);

    // Fallback so your app still works if Gemini is unavailable
    return {
      score: 70,
      explanation: "Default compatibility score.",
    };
  }
};