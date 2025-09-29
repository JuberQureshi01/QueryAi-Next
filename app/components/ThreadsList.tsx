"use client";

import { useEffect } from "react";
import axios from "axios";
import { useChat } from "../context/ChatContext";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface ThreadsListProps {
  currThreadId: string | null;
}

export default function ThreadsList({ currThreadId }: ThreadsListProps) {
  const {
    allThreads,
    setAllThreads,
    setCurrThreadId,
    setPrevChats,
    setNewChat,
    setReply,
  } = useChat();
  const router = useRouter();

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const { data } = await axios.get("/api/threads");
        setAllThreads(data);
      } catch (err) {
        console.error("Failed to fetch threads", err);
      }
    };
    fetchThreads();
  }, [setAllThreads]);

  const changeThread = (id: string) => {
    setCurrThreadId(id);
    router.push(`/chat/${id}`);
  };

  const deleteThread = async (id: string) => {
    try {
      await axios.delete(`/api/threads/${id}`);
      setAllThreads((prev) => prev.filter((t) => t.threadId !== id));
      if (id === currThreadId) {
        setNewChat(true);
        setPrevChats([]);
        setCurrThreadId(null);
        setReply(null);
        router.push("/chat");
      }
    } catch (err) {
      console.error("Failed to delete thread:", err);
    }
  };

  return (
    <ul className="space-y-2">
      {allThreads?.map((thread) => (
        <li
          key={thread.threadId}
          className={`group relative text-sm p-2.5 rounded-lg cursor-pointer hover:bg-white/5 truncate ${
            thread.threadId === currThreadId ? "bg-white/10" : ""
          }`}
          onClick={() => changeThread(thread.threadId)}
        >
          {thread.title}
          <Trash2
            size={16}
            className="absolute right-2 top-1/2 -translate-y-1/2 
             text-red-400 cursor-pointer 
             opacity-100 lg:opacity-0 group-hover:lg:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              deleteThread(thread.threadId);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
