import React, { useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;
