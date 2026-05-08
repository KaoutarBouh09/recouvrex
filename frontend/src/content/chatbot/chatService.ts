// src/content/chatbot/chatService.ts

const BASE_URL = 'http://localhost:9080/public/chat';

export interface ChatMessage {
  sender: 'CLIENT' | 'AI' | 'AGENT';
  message: string;
  timestamp: string;
}

export const validateAccess = async (
  token: string,
  pinCode: string
): Promise<void> => {
  const response = await fetch(
    `${BASE_URL}/validate?token=${token}&pinCode=${pinCode}`,
    { method: 'POST' }
  );
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
};

export const sendMessage = async (
  token: string,
  pinCode: string,
  message: string
): Promise<ChatMessage> => {
  const response = await fetch(`${BASE_URL}/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, pinCode, message }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};

export const closeSession = async (
  token: string,
  pinCode: string
): Promise<void> => {
  const response = await fetch(
    `${BASE_URL}/close?token=${token}&pinCode=${pinCode}`,
    { method: 'POST' }
  );
  if (!response.ok) throw new Error('Erreur lors de la cloture');
};

// ✅ AJOUT : récupérer tous les messages de la session (pour le polling)
export const getMessages = async (
  token: string,
  pinCode: string
): Promise<ChatMessage[]> => {
  const response = await fetch(
    `${BASE_URL}/messages?token=${token}&pinCode=${pinCode}`,
    { method: 'GET' }
  );
  if (!response.ok) throw new Error('Erreur lors du chargement des messages');
  return response.json();
};