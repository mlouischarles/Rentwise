
export interface UserFinances {
  monthlyIncome: number;
  monthlyDebt: number;
  fixedExpenses: number;
  savingsGoal: number;
}

export interface RentRecommendation {
  type: 'Conservative' | 'Moderate' | 'Stretch';
  percentage: number;
  amount: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  description: string;
}

export interface AnalysisResponse {
  summary: string;
  recommendations: RentRecommendation[];
  budgetSnapshot: string;
  austinContext: string;
  actionItems: string[];
  followUpQuestions: string[];
}
