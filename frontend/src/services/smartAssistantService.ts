import axiosInstance from 'src/config/axiosConfig'; // adapter le chemin selon votre projet


export interface ActionRecommandee {
  titre: string;
  priorite: 'HAUTE' | 'MOYENNE' | 'BASSE';
  description: string;
}

export interface SmartAssistantResponse {
  niveauRisque: 'FAIBLE' | 'MOYEN' | 'ÉLEVÉ';
  resume: string;
  actions: ActionRecommandee[];
}

// ✅ Un seul appel avec le caseId — le backend agrège tout
export const analyzeByCaseId = async (
  caseId: number
): Promise<SmartAssistantResponse> => {
  const response = await axiosInstance.get<SmartAssistantResponse>(
    `/api/smart-assistant/analyze/${caseId}`
  );
  return response.data;
};