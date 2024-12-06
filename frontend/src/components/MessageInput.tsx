
import React, { useState, FormEvent } from 'react';

interface MessageInputProps {
  sendMessage: (message: string) => void;
  loading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ sendMessage, loading }) => {
  const [input, setInput] = useState('');

interface HandleSubmitEvent extends FormEvent<HTMLFormElement> {}

const handleSubmit = (e: HandleSubmitEvent) => {
    e.preventDefault();
    if (input.trim()) {
        sendMessage(input);
        setInput('');
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>Send</button>
    </form>
  );
};

export default MessageInput;