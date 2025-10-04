"use client";

import { useChat } from "../context/ChatContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SquarePen, PanelLeft, LogOut } from "lucide-react";
import ThreadsList from "./ThreadsList"; 
import toast from "react-hot-toast";
export default function Sidebar() {
  const {
    currThreadId,
    setCurrThreadId,
    setPrevChats,
    setNewChat,
    setPrompt,
    isSidebarOpen,
    setSidebarOpen,
    setReply,
  } = useChat();

  const router = useRouter();

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(null);
    setPrevChats([]);
    setSidebarOpen(false);
    router.push("/chat");
  };
  const handleLogout = async () => {
    signOut();
    toast.success("Logout Successfull", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-10 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-[#171717] text-gray-400 flex flex-col justify-between z-20 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex justify-between items-center p-4 border-b  border-white/10">
            <div className="bg-white h-6 rounded-xl flex justify-center items-center">
              <Image
                src="/blacklogo.png"
                alt="QueryAI Logo"
                width={32}
                height={44}
                className="rounded-full"
              />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
            >
              <PanelLeft size={20} />
            </button>
          </div>

          <div className="px-4 py-2">
            <button
              onClick={createNewChat}
              className="flex items-center  p-3 justify-between rounded-lg hover:bg-white/5 transition-colors duration-200 w-full font-medium"
            >
              <span>New Chat</span>
              <SquarePen size={18} />
            </button>
          </div>

          <div className="m-2.5 p-2.5 h-[calc(100%-160px)]  custom-scrollbar">
            <ThreadsList currThreadId={currThreadId} />
          </div>
        </div>

        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="flex items-center justify-between p-2.5 rounded-lg w-full hover:bg-white/5 transition-colors duration-200"
          >
            <span>Log Out</span>
            <LogOut size={20}/>
          </button>
          <p className="text-xs text-center pt-2 text-gray-500">
            By Juber Qureshi ❤️
          </p>
        </div>
      </aside>
    </>
  );
}
