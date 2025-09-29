"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  index: number;
}

export default function ChatMessage({ role, content, index }: ChatMessageProps) {
  const isImage = content.startsWith("data:image/png;base64,");

  return (
    <div className={`mb-4 flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`${role === "user" ? "max-w-[70%]" : "w-full"}`}>
        {isImage ? (
          <a href={content} download={`queryai-image-${index}.png`} title="Click to download">
            <Image
              src={content}
              alt="Generated"
              width={400}
              height={400}
              className="rounded-lg max-w-full h-auto cursor-pointer"
            />
          </a>
        ) : (
          <div
            className={`${
              role === "user"
                ? "bg-[#323232] text-white px-4 py-2 rounded-2xl break-words"
                : "bg-transparent p-4 rounded-2xl break-words overflow-x-auto prose prose-invert"
            }`}
          >
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
