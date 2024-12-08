interface ChatHistoryProps {
  history: { role: string; text: string }[];
}

const ChatDisplay: React.FC<ChatHistoryProps> = ({ history }) => {
  return (
    <div className="flex flex-col p-4 space-y-4 overflow-y-auto h-96 bg-gray-100 rounded-lg shadow-inner">
      {history.map((message, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg max-w-xs ${
            message.role === "user"
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-300 text-black self-start"
          }`}
        >
          <span>{message.text}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
