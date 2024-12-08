import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";

interface ChatHistoryProps {
  history: { role: string; text: string; timestamp: string }[];
}

const ChatDisplay: React.FC<ChatHistoryProps> = ({ history }) => {
  return (
    <div className="flex flex-col p-4 space-y-4 overflow-y-auto h-96 bg-gray-100 rounded-lg shadow-inner border border-gray-300">
      {history.map((message, index) => (
        <div
          key={index}
          className={`flex items-start space-x-2 p-3 rounded-lg max-w-md ${
            message.role === "user"
              ? "bg-blue-500 text-white self-end flex-row-reverse"
              : "bg-gray-300 text-black self-start"
          }`}
        >
          <div className="flex-shrink-0">
            <FontAwesomeIcon
              icon={message.role === "user" ? faUser : faRobot}
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div>
            <div className="text-sm">{message.text}</div>
            <div className="text-xs text-gray-500">{message.timestamp}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
