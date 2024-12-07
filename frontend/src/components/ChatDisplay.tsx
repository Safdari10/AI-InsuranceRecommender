

interface ChatHistoryProps {
  history: { role: string; text: string }[];
}

const ChatDisplay: React.FC<ChatHistoryProps> = ({ history }) => {
  return (
    <div className="chat-history">
      {history.map((message, index) => (
        <div key={index} className={`message ${message.role}`}>
          <span>{message.text}</span> {/* Ensure we're rendering the text */}
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
