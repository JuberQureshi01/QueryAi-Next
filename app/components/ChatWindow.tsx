"use client";

import { useRef, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import Navbar from "./Navbar";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import WelcomeScreen from "./WelcomeScreen";
import ScaleLoader from "./ScaleLoader";

export default function ChatWindow() {
  const { prevChats, loading } = useChat();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [prevChats, loading]);

  return (
    <div className="relative flex flex-col h-screen w-full bg-[#212121] text-white items-center">
      <Navbar />

      <div className="flex-grow w-full overflow-y-auto custom-scrollbar p-4">
        <div className="max-w-3xl mx-auto h-full">
          {prevChats.length === 0 && !loading ? (
            <WelcomeScreen />
          ) : (
            <>
              {prevChats.map((chat, index) => (
                <ChatMessage
                  key={index}
                  index={index}
                  role={chat.role}
                  content={chat.content}
                />
              ))}

              {loading && <ScaleLoader />}
            </>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-[55%] p-4 px-0 flex flex-col items-center">
        <ChatInput />
      </div>
    </div>
  );
}
