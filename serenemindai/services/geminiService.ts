// import { GoogleGenerativeAI, Content } from "@google/generative-ai";

// // --- THIS IS THE TEMPORARY DEBUGGING FIX ---
// // We are bypassing the .env system entirely by putting the key directly in the code.
// // This is ONLY for testing to see if the app loads.
// const API_KEY = "AIzaSyAdBaXXBVe6XAzYX76Kp8bNuDsihpS2NUA";

// // The old code is commented out below for reference.
// // const API_KEY = process.env.REACT_APP_API_KEY;

// if (!API_KEY) {
//   // This error should now be impossible to get.
//   throw new Error("API_KEY is somehow still not set.");
// }
// const API_URL = "http://localhost:5000/api";

// const genAI = new GoogleGenerativeAI(API_KEY);
// const modelName = "gemini-1.5-flash";

// const FLAGGED_KEYWORDS = [
//   "suicide",
//   "kill myself",
//   "end it all",
//   "no reason to live",
//   "hopeless",
//   "i want to die",
// ];

// export const checkForFlags = async (
//   text: string,
//   userEmail: string,
//   type: "Journal" | "Chat"
// ): Promise<void> => {
//   if (!text || !userEmail) return;
//   const contentLower = text.toLowerCase();
//   if (FLAGGED_KEYWORDS.some((keyword) => contentLower.includes(keyword))) {
//     try {
//       await fetch(`${API_URL}/admin/flags`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text, userEmail, type }),
//       });
//     } catch (error) {
//       console.error("Failed to send flag to backend:", error);
//     }
//   }
// };

// const getAIResponse = async (
//   prompt: string,
//   systemInstruction: string
// ): Promise<string> => {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: modelName,
//       systemInstruction: {
//         role: "system",
//         parts: [{ text: systemInstruction }],
//       },
//     });
//     const result = await model.generateContent(prompt);
//     return (
//       result.response.text() ?? "I'm sorry, I couldn't generate a response."
//     );
//   } catch (error) {
//     console.error("Error fetching AI response:", error);
//     return "I'm having trouble connecting right now. Please try again.";
//   }
// };

// export const summarizeJournalEntry = async (
//   entryContent: string
// ): Promise<string> => {
//   const prompt = `Please provide a gentle, insightful summary for this journal entry: "${entryContent}"`;
//   return getAIResponse(prompt, "You are an insightful journal analyst.");
// };

// export const getMotivationalQuote = async (
//   adminQuotes: { text: string }[]
// ): Promise<string> => {
//   if (Array.isArray(adminQuotes) && adminQuotes.length > 0) {
//     const randomIndex = Math.floor(Math.random() * adminQuotes.length);
//     return adminQuotes[randomIndex].text;
//   }
//   const prompt = "Give me one powerful motivational quote.";
//   return getAIResponse(prompt, "You are a curator of inspiring quotes.");
// };

// export const startChatAndStreamResponse = async (
//   history: Content[],
//   newMessage: string,
//   onStream: (chunk: string) => void
// ): Promise<void> => {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: modelName,
//       systemInstruction: {
//         role: "system",
//         parts: [{ text: "You are Serene, a compassionate AI companion..." }],
//       },
//     });
//     const chat = model.startChat({ history });
//     const result = await chat.sendMessageStream(newMessage);
//     for await (const chunk of result.stream) {
//       onStream(chunk.text());
//     }
//   } catch (error) {
//     console.error("Error in chat response stream:", error);
//     onStream("I'm having trouble thinking. Please try again.");
//   }
// };
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error(
    "API_KEY environment variable not set. Check your .env file and RESTART the server."
  );
}
const API_URL = "http://localhost:5000/api";

const genAI = new GoogleGenerativeAI(API_KEY);
const modelName = "gemini-1.5-flash";

const FLAGGED_KEYWORDS = [
  "suicide",
  "kill myself",
  "end it all",
  "no reason to live",
  "hopeless",
  "i want to die",
];

export const checkForFlags = async (
  text: string,
  userEmail: string,
  type: "Journal" | "Chat"
): Promise<void> => {
  if (!text || !userEmail) return;
  const contentLower = text.toLowerCase();
  if (FLAGGED_KEYWORDS.some((keyword) => contentLower.includes(keyword))) {
    try {
      await fetch(`${API_URL}/admin/flags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, userEmail, type }),
      });
    } catch (error) {
      console.error("Failed to send flag to backend:", error);
    }
  }
};

const getAIResponse = async (
  prompt: string,
  systemInstruction: string
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: {
        role: "system",
        parts: [{ text: systemInstruction }],
      },
    });
    const result = await model.generateContent(prompt);
    return (
      result.response.text() ?? "I'm sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "I'm having trouble connecting right now. Please try again.";
  }
};

export const summarizeJournalEntry = async (
  entryContent: string
): Promise<string> => {
  const prompt = `Please provide a gentle, insightful summary for this journal entry: "${entryContent}"`;
  return getAIResponse(prompt, "You are an insightful journal analyst.");
};

export const getMotivationalQuote = async (
  adminQuotes: { text: string }[]
): Promise<string> => {
  if (Array.isArray(adminQuotes) && adminQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * adminQuotes.length);
    return adminQuotes[randomIndex].text;
  }
  const prompt = "Give me one powerful motivational quote.";
  return getAIResponse(prompt, "You are a curator of inspiring quotes.");
};

export const startChatAndStreamResponse = async (
  history: Content[],
  newMessage: string,
  onStream: (chunk: string) => void
): Promise<void> => {
  try {
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: {
        role: "system",
        parts: [{ text: "You are Serene, a compassionate AI companion..." }],
      },
    });
    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(newMessage);
    for await (const chunk of result.stream) {
      onStream(chunk.text());
    }
  } catch (error) {
    console.error("Error in chat response stream:", error);
    onStream("I'm having trouble thinking. Please try again.");
  }
};
