"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Menu, User, LogOut, Settings, CloudUpload } from "lucide-react";
import { useChat } from "../context/ChatContext";

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const {isSidebarOpen,setSidebarOpen} = useChat()

  return (
    <div className="w-full flex justify-between items-center p-4 md:p-6 border-b border-white/10">
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <Menu size={22} className="text-white/80 hover:text-white" />
          </button>
        )}
        <span className="text-lg font-semibold">QueryAI</span>
      </div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center"
        >
          <User size={24} />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-12 right-0 w-48 bg-[#323232] rounded-md shadow-lg z-10 p-2">
            <button
              className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 w-full text-left"
            >
              <CloudUpload size={16} /> Upgradeplan
            </button><button
              className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 w-full text-left"
            >
              <Settings size={16} /> Settings
            </button>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 w-full text-left"
            >
              <LogOut size={16} /> Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
