// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { ChatMessage } from "../types";
// import {
//   startChatAndStreamResponse,
//   checkForFlags,
// } from "../services/geminiService";
// import Icon, { IconName } from "../components/ui/Icon";

// const ChatPage: React.FC = () => {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const isGuest = !user?.token;
//   const chatHistoryKey = `chatHistory_${user.email || "guest"}`;

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   const loadChatHistory = useCallback(() => {
//     const savedMessages = localStorage.getItem(chatHistoryKey);
//     if (savedMessages) {
//       setMessages(JSON.parse(savedMessages));
//     } else {
//       setMessages([
//         {
//           id: "initial",
//           role: "model",
//           text: `Welcome! How are you feeling?`,
//           timestamp: new Date().toISOString(),
//         },
//       ]);
//     }
//   }, [isGuest, user.name, chatHistoryKey]);

//   useEffect(() => {
//     loadChatHistory();
//   }, [loadChatHistory]);

//   const handleSend = async () => {
//     if (input.trim() === "" || isLoading) return;

//     await checkForFlags(input, user.email, "Chat");

//     const userMessage: ChatMessage = {
//       id: Date.now().toString(),
//       role: "user",
//       text: input,
//       timestamp: new Date().toISOString(),
//     };

//     // We will now add the placeholder AFTER sending the request
//     // This simplifies state management.
//     setMessages((prev) => [...prev, userMessage]);

//     const currentInput = input;
//     setInput("");
//     setIsLoading(true);

//     // --- THIS IS THE CRITICAL FIX ---
//     // We filter out the initial welcome message before sending the history to the API.
//     const chatHistoryForApi = [...messages, userMessage]
//       .filter((m) => m.id !== "initial") // Remove the AI's "Welcome" message
//       .slice(-10) // Get the last 10 real messages
//       .map((m) => ({
//         role: m.role,
//         parts: [{ text: m.text }],
//       }));

//     let aiResponseText = "";
//     const aiResponseId = (Date.now() + 1).toString();

//     // Add a placeholder for the AI response
//     setMessages((prev) => [
//       ...prev,
//       {
//         id: aiResponseId,
//         role: "model",
//         text: "...",
//         timestamp: new Date().toISOString(),
//       },
//     ]);

//     await startChatAndStreamResponse(
//       chatHistoryForApi,
//       currentInput,
//       (chunk) => {
//         aiResponseText += chunk;
//         setMessages((prev) =>
//           prev.map((msg) =>
//             msg.id === aiResponseId ? { ...msg, text: aiResponseText } : msg
//           )
//         );
//       }
//     );

//     setIsLoading(false);
//   };

//   return (
//     <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto">
//       <div className="flex-1 overflow-y-auto p-4 space-y-6">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex items-end gap-3 ${
//               msg.role === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             {msg.role === "model" && msg.id !== "initial" && (
//               <div className="w-10 h-10 rounded-full bg-secondary/20 flex-shrink-0" />
//             )}
//             {msg.id === "initial" && (
//               <div className="w-10 h-10 rounded-full bg-gray-300/20 flex-shrink-0" />
//             )}
//             <div
//               className={`max-w-lg px-4 py-3 rounded-2xl ${
//                 msg.role === "user"
//                   ? "bg-primary text-white"
//                   : "bg-light-card dark:bg-dark-card"
//               }`}
//             >
//               <p>{msg.text}</p>
//             </div>
//             {msg.role === "user" && (
//               <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0" />
//             )}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="p-4 border-t">
//         <div className="relative">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && handleSend()}
//             placeholder="Type your message..."
//             className="w-full pl-4 pr-12 py-3 rounded-full"
//             disabled={isLoading}
//           />
//           <button
//             onClick={handleSend}
//             disabled={isLoading || !input.trim()}
//             className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-white"
//           >
//             <Icon name={IconName.Send} className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChatMessage } from "../types";
import {
  startChatAndStreamResponse,
  checkForFlags,
} from "../services/geminiService";
import Icon, { IconName } from "../components/ui/Icon";

const ChatPage: React.FC = () => {
  // --- All of this logic is UNCHANGED ---
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isGuest = !user?.token;
  const chatHistoryKey = `chatHistory_${user.email || "guest"}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const loadChatHistory = useCallback(() => {
    const savedMessages = localStorage.getItem(chatHistoryKey);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        {
          id: "initial",
          role: "model",
          text: isGuest
            ? "Hello! As a guest, your conversation will not be saved. How are you feeling today?"
            : `Welcome back, ${user.name}! How are you feeling today?`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [isGuest, user.name, chatHistoryKey]);

  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    await checkForFlags(input, user.email, "Chat");

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    setInput("");
    setIsLoading(true);

    const chatHistoryForApi = [...messages, userMessage]
      .filter((m) => m.id !== "initial")
      .slice(-10)
      .map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

    let aiResponseText = "";
    const aiResponseId = (Date.now() + 1).toString();

    setMessages((prev) => [
      ...prev,
      {
        id: aiResponseId,
        role: "model",
        text: "", // Start empty for the typing indicator
        timestamp: new Date().toISOString(),
      },
    ]);

    await startChatAndStreamResponse(
      chatHistoryForApi,
      currentInput,
      (chunk) => {
        aiResponseText += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiResponseId ? { ...msg, text: aiResponseText } : msg
          )
        );
      }
    );

    setIsLoading(false);
  };

  // --- All of the JSX below has been re-styled ---
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto animate-fade-in-up">
      {/* CHAT MESSAGE AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* AI Avatar */}
            {msg.role === "model" && (
              <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex-shrink-0 flex items-center justify-center">
                <Icon name={IconName.Chat} className="w-6 h-6" />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-lg px-4 py-3 rounded-2xl shadow-md ${
                msg.role === "user"
                  ? "bg-primary text-white rounded-br-none" // User bubble style
                  : "bg-light-card dark:bg-dark-card rounded-bl-none" // AI bubble style
              }`}
            >
              {/* Show typing indicator or message text */}
              {msg.text ? (
                <p className="text-base">{msg.text}</p>
              ) : (
                <div className="flex items-center space-x-2 text-light-subtle dark:text-dark-subtle">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            {msg.role === "user" && (
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex-shrink-0 flex items-center justify-center">
                <Icon name={IconName.User} className="w-6 h-6" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-primary hover:bg-primary-focus disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus"
          >
            <Icon name={IconName.Send} className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
