import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Attachment } from "../types";

let chatSession: Chat | null = null;

// Safely retrieve API Key from environment to avoid "process is not defined" crashes in browser
const getEnvApiKey = (): string | undefined => {
  try {
    // Check if process exists and is an object before accessing env
    // @ts-ignore
    if (typeof process !== 'undefined' && process && process.env) {
      // @ts-ignore
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore any errors accessing process
    return undefined;
  }
  return undefined;
};

export const initializeChatSession = () => {
  const apiKey = getEnvApiKey();
  
  if (!apiKey) {
    console.error("API Key not found in environment variables.");
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  const config = {
    systemInstruction: SYSTEM_INSTRUCTION,
    temperature: 0.3, // Low temperature for precise academic answers
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
  };

  // Using gemini-2.5-flash for speed and efficiency in text tasks
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config,
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string, attachments: Attachment[] = []): Promise<string> => {
  if (!chatSession) {
    initializeChatSession();
  }

  if (!chatSession) {
     throw new Error("Failed to initialize chat session");
  }

  try {
    let messagePayload: any;

    if (attachments.length > 0) {
        const parts = [];
        
        // Add attachments as inlineData parts
        for (const attachment of attachments) {
            parts.push({
                inlineData: {
                    mimeType: attachment.mimeType,
                    data: attachment.data
                }
            });
        }
        
        // Add text prompt as a text part
        if (message) {
            parts.push({ text: message });
        }

        messagePayload = { message: parts };
    } else {
        // Just text
        messagePayload = { message: message };
    }

    const response = await chatSession.sendMessage(messagePayload);
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};