import React, { useState } from "react";
import ChatDisplay from "./components/ChatDisplay";
import MessageInput from "./components/MessageInput";
import { sendMessageToAI } from "./services/ChatService";

const ChatBox: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<{ role: string; text: string }[]>([]);
  const [isChatStarted, setIsChatStarted] = useState(false);

  const handleStart = async () => {
    try {
      const introMessage = await sendMessageToAI("Start Conversation", []); // Start with an empty history
      setChatHistory([{ role: "ai", text: introMessage }]);
      setIsChatStarted(true);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const handleSend = async (message: string) => {
    // Add user message to chat history
    const newUserMessage = { role: "user", text: message };
    setChatHistory((prev) => [...prev, newUserMessage]);

    try {
      // Send the user message to AI, passing only relevant history
      const aiResponse = await sendMessageToAI(message, chatHistory); // Send current chat history
      const newAIMessage = { role: "ai", text: aiResponse };

      // Add the AI response to the chat history
      setChatHistory((prev) => [...prev, newAIMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex justify-center items-center h-16 bg-blue-500 text-white">
        <h1 className="text-xl font-bold">Chatbot</h1>
      </div>
      <div className="flex flex-col flex-1 p-4">
        {isChatStarted ? (
          <>
            <ChatDisplay history={chatHistory} />
            <MessageInput onSend={handleSend} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1">
            <button
              onClick={handleStart}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Start Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;