"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useChat } from "../..//context/ChatContext";
import ChatWindow from "../../components/ChatWindow";

export default function ExistingChatPage() {
  const { setPrevChats, setNewChat, setCurrThreadId } = useChat();
  const params = useParams();
  const threadId = params.threadId as string;

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (threadId) {
        try {
          const response = await fetch(`/api/threads/${threadId}`);
          const data = await response.json();
          
          if (response.ok) {
            setPrevChats(data);
            setNewChat(false);
            setCurrThreadId(threadId);
          } else {
            console.error("Failed to fetch chat history:", data.error);
          }
        } catch (err) {
          console.error("An error occurred while fetching chat history:", err);
        }
      }
    };

    fetchChatHistory();
  }, [threadId, setPrevChats, setNewChat, setCurrThreadId]);

  return (
      <ChatWindow  />
  );
}
