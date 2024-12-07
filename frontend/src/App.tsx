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
    <div className="chat-box">
      {!isChatStarted ? (
        <button onClick={handleStart} className="start-button">
          Start Chat
        </button>
      ) : (
        <>
          <ChatDisplay history={chatHistory} />
          <MessageInput onSend={handleSend} />
        </>
      )}
    </div>
  );
};

export default ChatBox;
