import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";
import Markdown from "react-markdown";

interface ChatHistoryProps {
  history: { role: string; text: string; timestamp: string }[];
}

const ChatDisplay: React.FC<ChatHistoryProps> = ({ history }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="flex flex-col p-6 space-y-6 overflow-y-auto h-[600px] bg-white rounded-lg shadow-inner border border-gray-300">
      {history.map((message, index) => (
        <div
          key={index}
          className={`flex items-start space-x-4 p-4 rounded-lg max-w-2xl shadow-md transition-transform transform ${
            message.role === "user"
              ? "bg-blue-500 text-white self-end flex-row-reverse translate-x-2"
              : "bg-gray-100 text-gray-800 self-start -translate-x-2"
          }`}
        >
          <div className="flex-shrink-0">
            <FontAwesomeIcon
              icon={message.role === "user" ? faUser : faRobot}
              className={`w-12 h-12 rounded-full mx-2 ${message.role === "user" ? "text-white" : "text-blue-500"}`}
            />
          </div>
          <div>
            <div className="text-2xl"><Markdown>{message.text}</Markdown></div>
            <div className={`text-lg ${message.role === "user" ? "text-gray-200" : "text-gray-500"}`}>{message.timestamp}</div>
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatDisplay;
