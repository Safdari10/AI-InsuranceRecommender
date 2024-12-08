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
    <form onSubmit={handleSend} className="flex items-center p-4 border-t border-gray-200">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="text-2xl flex-1 p-2 h-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f9ed5]"
      />
      <button
        type="submit"
        className="text-2xl ml-4 px-4 py-2 h-16 w-28 bg-[#0f9ed5] text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[#0f9ed5]"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
