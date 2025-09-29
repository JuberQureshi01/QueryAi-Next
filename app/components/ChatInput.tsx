"use client";

import { FormEvent } from "react";
import { useChat } from "../context/ChatContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function ChatInput() {
  const {
    prompt,
    setPrompt,
    prevChats,
    setPrevChats,
    newChat,
    setNewChat,
    setCurrThreadId,
    loading,
    setAllThreads,
    setLoading,
    currThreadId,
  } = useChat();

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    const currentPrompt = prompt;
    setPrompt("");

    const userMessage = { role: "user" as const, content: currentPrompt };
    setPrevChats([...prevChats, userMessage]);

    const isImagePrompt = currentPrompt.trim().startsWith("/imagine");
    const apiEndpoint = isImagePrompt ? "/api/text-to-image" : "/api/chat";

    const requestBody = isImagePrompt
      ? {
          prompt: currentPrompt.replace("/imagine", "").trim(),
          style: "photorealistic",
          threadId: newChat ? uuidv4() : currThreadId,
        }
      : { message: currentPrompt, threadId: newChat ? uuidv4() : currThreadId };

    try {
      const { data } = await axios.post(apiEndpoint, requestBody);

      const assistantContent = data.imageUrl || data.image || data.reply;
      if (assistantContent) {
        setPrevChats((prev) => [
          ...prev,
          { role: "assistant", content: assistantContent },
        ]);
      }

      if (newChat) {
        const newThreadId = requestBody.threadId!;
        setCurrThreadId(newThreadId);
        setAllThreads((prev) => [
          { threadId: newThreadId, title: currentPrompt.substring(0, 30) },
          ...prev,
        ]);
        setNewChat(false);
      }
    } catch (err: unknown) {
      if (typeof err === "string") {
        console.log("Something went wrong.");
      } else {
        setPrevChats((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Failed to connect to the server.",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        placeholder="Ask anything or use /imagine..."
        className="w-full bg-white/5 border-none rounded-2xl p-5 pr-14 text-base text-white shadow-lg focus:outline-none disabled:opacity-50"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center text-xl cursor-pointer hover:text-gray-300 disabled:opacity-50"
        disabled={!prompt.trim()}
      >
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </form>
  );
}
