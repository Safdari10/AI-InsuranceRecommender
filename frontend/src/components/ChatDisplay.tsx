import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";

interface ChatHistoryProps {
  history: { role: string; text: string; timestamp: string }[];
}

const ChatDisplay: React.FC<ChatHistoryProps> = ({ history }) => {
  return (
    <div className="flex flex-col p-4 space-y-4 overflow-y-auto h-[400px] bg-gray-100 rounded-lg shadow-inner border border-gray-300">
      {history.map((message, index) => (
        <div
          key={index}
          className={`flex items-start space-x-2 p-3 rounded-lg max-w-2xl ${
            message.role === "user"
              ? "bg-[#0f9ed5] text-white self-end flex-row-reverse"
              : "bg-gray-300 text-black self-start"
          }`}
        >
          <div className="flex-shrink-0">
            <FontAwesomeIcon
              icon={message.role === "user" ? faUser : faRobot}
              className="w-10 h-10 rounded-full mx-2"
            />
          </div>
          <div>
            <div className="text-2xl">{message.text}</div>
            <div className={`text-sm ${message.role === "user" ? "text-zinc-950" : "text-gray-500"}`}>{message.timestamp}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
