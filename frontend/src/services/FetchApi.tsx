import axios from 'axios';

export const startChat = async () => {
  try {
    const response = await axios.get('http://localhost:3001/start-chat');
    return response.data.response;
  } catch (error) {
    console.error('Error starting chat:', error);
    throw error;
  }
};

export const sendMessageToTina = async (message: string) => {
  try {
    const response = await axios.post('http://localhost:3001/chat', { message });
    return response.data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};