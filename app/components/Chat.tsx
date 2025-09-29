"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import ChatMessage from "./ChatMessage";

export default function Chat() {
  const { newChat, prevChats, reply, setPrevChats } = useChat();
  const [typingReply, setTypingReply] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [prevChats, typingReply]);

  useEffect(() => {
    if (reply) {
      setPrevChats((prev) => [...prev, { role: "assistant", content: "" }]);
      setTypingReply(reply);
    }
  }, [reply, setPrevChats]);

  useEffect(() => {
    if (!typingReply) return;

    let charIndex = 0;
    const interval = setInterval(() => {
      setPrevChats((prev) => {
        if (prev.length === 0) return prev;
        const newChats = [...prev];
        const lastMessage = newChats[newChats.length - 1];
        newChats[newChats.length - 1] = {
          ...lastMessage,
          content: typingReply.slice(0, charIndex + 1),
        };
        return newChats;
      });
      
      charIndex++;
      if (charIndex >= typingReply.length) {
        clearInterval(interval);
        setTypingReply("");
      }
    }, 30);

    return () => clearInterval(interval);
  }, [typingReply, setPrevChats]);

  return (
    <div className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 overflow-y-auto">
      {newChat && prevChats.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <h1 className="text-2xl mt-12 sm:text-4xl font-bold text-gray-400">
            Start a New Chat!
          </h1>
        </div>
      )}

      <div className="flex flex-col space-y-4 py-8">
        {prevChats.map((chat, idx) => (
          <ChatMessage key={idx} role={chat.role} content={chat.content} index={idx} />
        ))}

        <div ref={chatEndRef} />
      </div>
    </div>
  );
}
