"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ChatContextType {
  chatHistory: { role: string; content: string }[];
  addMessage: (message: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);

  const addMessage = (message: string) => {
    try {
      const parsedMessage = JSON.parse(message);
      setChatHistory(prev => [...prev, parsedMessage]);
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  };

  return (
    <ChatContext.Provider value={{ chatHistory, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);