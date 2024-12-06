import { useState } from 'react';
import ChatDisplay from './components/ChatDisplay';
import MessageInput from './components/MessageInput';
import { startChat, sendMessageToTina } from './services/FetchApi';

interface Message {
  role: string;
  text: string;
}

const App = () => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleStartChat = async () => {
    setLoading(true);
    try {
      const response = await startChat();
      setConversation([{ role: 'system', text: response }]);
    } catch (error) {
      console.error('Error starting chat:', error);
    } finally {
      setLoading(false);
    }
  };

  interface SendMessage {
    (message: string): Promise<void>;
  }

  const handleSendMessage: SendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await sendMessageToTina(message);
      setConversation([...conversation, { role: 'user', text: message }, { role: 'system', text: response }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleStartChat} disabled={loading}>Start Interview</button>
      <ChatDisplay conversation={conversation} />
      <MessageInput sendMessage={handleSendMessage} loading={loading} />
    </div>
  );
};

export default App;