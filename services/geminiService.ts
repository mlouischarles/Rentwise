
import { GoogleGenAI, Type } from "@google/genai";
import { UserFinances, AnalysisResponse } from "../types";

export const getRentAnalysis = async (finances: UserFinances): Promise<AnalysisResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    You are Rentwise, a specialized financial assistant for first-time renters in Austin, Texas.
    Analyze the following monthly financial profile:
    - Monthly Take-home Income: $${finances.monthlyIncome}
    - Monthly Debt (Loans/Credit): $${finances.monthlyDebt}
    - Fixed Expenses (Groceries/Utilities/etc): $${finances.fixedExpenses}
    - Monthly Savings Goal: $${finances.savingsGoal}

    Guidelines:
    1. Calculate three rent tiers:
       - Conservative (Safe): 25% of take-home pay
       - Moderate (Upper Comfort): 30% of take-home pay
       - Stretch (Risky): 35% of take-home pay
    2. Provide Austin-specific context (mentioning neighborhoods or local costs like utilities/Austin Energy).
    3. Be protective of the user's financial health.
    4. Ensure the budget snapshot explains what is left over after rent + existing expenses.

    Always end with: "This tool provides financial guidance, not financial advice."
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                percentage: { type: Type.NUMBER },
                amount: { type: Type.NUMBER },
                riskLevel: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["type", "percentage", "amount", "riskLevel", "description"]
            }
          },
          budgetSnapshot: { type: Type.STRING },
          austinContext: { type: Type.STRING },
          actionItems: { type: Type.ARRAY, items: { type: Type.STRING } },
          followUpQuestions: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["summary", "recommendations", "budgetSnapshot", "austinContext", "actionItems", "followUpQuestions"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as AnalysisResponse;
};
