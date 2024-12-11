import React, { useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSend} className="flex items-center p-6 border-t border-gray-200 bg-white shadow-md">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="text-2xl flex-1 p-4 h-14 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
      />
      <button
        type="submit"
        className="text-2xl ml-4 px-6 py-3 h-14 bg-blue-800 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-950 transition duration-300 ease-in-out"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
