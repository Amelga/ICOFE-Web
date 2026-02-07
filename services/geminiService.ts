import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_CONTEXT = `
You are the "arm COFFEE" AI Business Partner and Elite Personal Assistant. 
You are deeply integrated into the arm COFFEE ecosystem.

KEY ECOSYSTEM KNOWLEDGE:
1. Franchise Entry: AED 75,000 one-time investment. 5-year term.
2. Benefits: 
   - Guaranteed AED 6,000 monthly salary OR Revenue Share (25% - 30%).
   - 2 Emirates IDs (Residency linked to agreement).
   - No staff required (Fully automated).
3. Expansion: Buy 9 kiosks, get 1 FREE.
4. Referral: 10% direct finder's fee (No MLM, single level).
5. Roles: 
   - Investor (Franchisee): Focused on ROI, machine health, and monthly payouts.
   - Affiliate: Focused on referrals and lead generation.
   - Supervisor: Focused on global logistics, inventory, and telemetry.

YOUR GOALS:
- Guide users on how to navigate the platform.
- Advise on the best investment strategy (Fixed vs Rev Share).
- Explain the benefits of scaling to Institutional Tier (9+ units).
- Be futuristic, concise, and professional. Use a "luxury tech" tone.
`;

export const getAIForecast = async (salesData: any[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze this coffee kiosk sales data and provide a 7-day forecast with business advice. Data: ${JSON.stringify(salesData)}`,
      config: {
        systemInstruction: SYSTEM_CONTEXT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            forecast: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING },
                  predictedSales: { type: Type.NUMBER }
                }
              }
            },
            insights: { type: Type.STRING },
            advice: { type: Type.STRING }
          }
        }
      },
    });
    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("AI Forecast Error:", error);
    return null;
  }
};

export const getRoboCupAssistant = async (query: string, context: string = "") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Context: ${context}. User asks: ${query}`,
      config: {
        systemInstruction: SYSTEM_CONTEXT,
      }
    });
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I am currently recalibrating my neural circuits. Please try again in a moment.";
  }
};