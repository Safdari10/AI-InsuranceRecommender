import React, { useState, useEffect, useRef } from "react";
import ChatDisplay from "../components/ChatDisplay";
import MessageInput from "../components/MessageInput";
import { sendMessageToAI } from "../services/ChatService";

const ChatBox: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<
    { role: string; text: string; timestamp: string }[]
  >([]);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatStarted) {
      scrollToBottom();
    }
  }, [chatHistory, isChatStarted]);

  const handleStart = async () => {
    try {
      const introMessage = await sendMessageToAI("Start Conversation", []);
      setChatHistory([
        {
          role: "ai",
          text: introMessage,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setIsChatStarted(true);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const handleSend = async (message: string) => {
    const newUserMessage = {
      role: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatHistory((prev) => [...prev, newUserMessage]);

    setIsLoading(true);
    try {
      const aiResponse = await sendMessageToAI(message, [
        ...chatHistory,
        newUserMessage,
      ]);
      const newAIMessage = {
        role: "ai",
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatHistory((prev) => [...prev, newAIMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setChatHistory([]);
    setIsChatStarted(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center h-32 bg-blue-900 text-white shadow-lg px-8 py-4">
        <h1 className="text-5xl font-extrabold">Tina</h1>
        <h2 className="text-2xl font-semibold mt-2">Your AI Insurance Consultant</h2>

      </div>
      <div className="flex flex-col items-center flex-1 p-6">
        {isChatStarted ? (
          <>
            <div className="w-full max-w-3xl">
              <ChatDisplay history={chatHistory} />
              {isLoading && (
                <div className="text-xl text-center text-gray-500 mt-4">
                  Tina is typing...
                </div>
              )}
              <MessageInput onSend={handleSend} />
              <div ref={chatEndRef} />
              <button
                onClick={handleRestart}
                className="text-2xl px-8 py-4 mt-4 bg-blue-800 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-950 transition duration-300 ease-in-out w-full">
                Start a New Chat
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-semibold">
                Welcome to Turners Car Insurance
              </h2>
              <p className="text-xl">
                Chat with Tina, your AI Insurance Consultant
              </p>
            </div>
            <button
              onClick={handleStart}
              className="text-xl px-8 py-4 bg-blue-800 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-950 transition duration-300 ease-in-out">
              Start Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
