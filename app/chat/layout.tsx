"use client";

import React, { ReactNode } from "react";
import Sidebar from "../components/Sidebar"; 
import { ChatProvider } from "../context/ChatContext";

export default function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <ChatProvider>
      <div className="flex h-screen bg-gray-800 text-white">
        <Sidebar 
        />
        
        <main className="flex-1 flex flex-col relative">
          {children}
        </main>
      </div>
    </ChatProvider>
  );
}

