
interface Message {
  role: string;
  text: string;
}

interface ChatDisplayProps {
  conversation: Message[];
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ conversation }) => {
  return (
    <div>
      {conversation.map((message, index) => (
        <div key={index} className={message.role}>
          <strong>{message.role === 'user' ? 'You' : 'Tina'}:</strong> {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;