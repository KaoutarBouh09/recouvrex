// src/content/chatbot/agentChatService.ts

import axiosInstance from 'src/config/axiosConfig';

export interface ChatMessageDTO {
  sender: 'CLIENT' | 'AI' | 'AGENT';
  message: string;
  timestamp: string;
}

export interface ConversationDTO {
  sessionId: number;
  caseId: string;
  clientNom: string;
  clientPrenom: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CLOSED' | 'AGENT_TOOK_OVER';
  createdAt: string;
  messages: ChatMessageDTO[];
}

export const getAllConversations = async (userId?: number): Promise<ConversationDTO[]> => {
  const params = userId ? { userId } : {};
  const response = await axiosInstance.get<ConversationDTO[]>('/api/chat/conversations', { params });
  return response.data;
};

export const getConversation = async (sessionId: number): Promise<ConversationDTO> => {
  const response = await axiosInstance.get<ConversationDTO>(`/api/chat/conversations/${sessionId}`);
  return response.data;
};

export const agentIntervene = async (
  sessionId: number,
  message: string
): Promise<ChatMessageDTO> => {
  const response = await axiosInstance.post<ChatMessageDTO>(
    `/api/chat/conversations/${sessionId}/intervene`,
    { message }
  );
  return response.data;
};

export const downloadConversationPdf = async (sessionId: number): Promise<void> => {
  const response = await axiosInstance.get(
    `/api/chat/conversations/${sessionId}/pdf`,
    { responseType: 'blob' }
  );
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `conversation_${sessionId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

// ✅ Supprimer une conversation expirée
export const deleteConversation = async (sessionId: number): Promise<void> => {
  await axiosInstance.delete(`/api/chat/conversations/${sessionId}`);
};
