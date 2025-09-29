"use client";

import ChatWindow from "../components/ChatWindow";
import { useChat } from "../context/ChatContext";
import { useEffect } from "react";

export default function NewChatPage() {
  const { setNewChat, setPrevChats, setCurrThreadId } = useChat();

  useEffect(() => {
    setNewChat(true);
    setPrevChats([]);
    setCurrThreadId(null);
  }, [setNewChat, setPrevChats, setCurrThreadId]);

  return (
      <ChatWindow />
  );
}
