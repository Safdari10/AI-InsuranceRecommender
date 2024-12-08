import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";

interface ChatHistoryProps {
  history: { role: string; text: string; timestamp: string }[];
}

const ChatDisplay: React.FC<ChatHistoryProps> = ({ history }) => {
  return (
    <div className="flex flex-col p-6 space-y-6 overflow-y-auto h-[400px] bg-gradient-to-r from-purple-50 to-pink-100 rounded-lg shadow-inner border border-gray-300">
      {history.map((message, index) => (
        <div
          key={index}
          className={`flex items-start space-x-4 p-4 rounded-lg max-w-2xl shadow-md transition-transform transform ${
            message.role === "user"
              ? "bg-purple-500 text-white self-end flex-row-reverse translate-x-2"
              : "bg-white text-black self-start -translate-x-2"
          }`}
        >
          <div className="flex-shrink-0">
            <FontAwesomeIcon
              icon={message.role === "user" ? faUser : faRobot}
              className="w-12 h-12 rounded-full mx-2"
            />
          </div>
          <div>
            <div className="text-xl">{message.text}</div>
            <div className={`text-md ${message.role === "user" ? "text-gray-200" : "text-gray-500"}`}>{message.timestamp}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
