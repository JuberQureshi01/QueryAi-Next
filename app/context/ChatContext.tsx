"use client";

import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ThreadInfo {
    threadId: string;
    title: string;
}

interface ChatContextType {
    prompt: string;
    setPrompt: (prompt: string) => void;
    reply: string | null;
    setReply: (reply: string | null) => void;
    currThreadId: string | null;
    setCurrThreadId: (id: string | null) => void;
    prevChats: Message[];
    setPrevChats: Dispatch<SetStateAction<Message[]>>;
    allThreads: ThreadInfo[];
    setAllThreads: Dispatch<SetStateAction<ThreadInfo[]>>;
    newChat: boolean;
    setNewChat: (isNew: boolean) => void;
    isSidebarOpen:boolean;
    setSidebarOpen:Dispatch<SetStateAction<boolean>>;
    loading:boolean;
    setLoading:Dispatch<SetStateAction<boolean>>;
    
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState<string | null>(null);
    const [currThreadId, setCurrThreadId] = useState<string | null>(null);
    const [prevChats, setPrevChats] = useState<Message[]>([]);
    const [allThreads, setAllThreads] = useState<ThreadInfo[]>([]);
    const [newChat, setNewChat] = useState(true);
    const[isSidebarOpen, setSidebarOpen ] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

    const providerValues = {
        prompt, setPrompt,
        reply, setReply,
        currThreadId, setCurrThreadId,
        prevChats, setPrevChats,
        allThreads, setAllThreads,
        newChat, setNewChat,
        isSidebarOpen,setSidebarOpen,
        loading,setLoading
    };

    return (
        <ChatContext.Provider value={providerValues}>
            {children}
        </ChatContext.Provider>
    );
};