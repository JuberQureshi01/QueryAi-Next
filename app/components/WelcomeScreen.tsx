import Image from "next/image";
import React from "react";

function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-fadeIn">
      <div className="bg-white rounded-full p-3 shadow-xl mb-6">
        <Image
          src="/blacklogo.png"
          alt="Logo"
          width={64}
          height={64}
          className="w-16 h-16 object-cover"
        />
      </div>

      <h1 className="text-4xl font-extrabold text-gray-100 mb-3 tracking-tight">
        Chat AI
      </h1>

      <p className="max-w-md text-gray-400 text-sm sm:text-base">
        Start a conversation or generate an image with a prompt. Try one of
        these to get started:
      </p>

      <div className="flex flex-wrap gap-3 mt-8 justify-center">
        {[
          "Explain quantum computing in simple terms",
          "/imagine a cat wearing a wizard hat",
          "Summarize today’s top tech news",
          "Write a poem about the ocean",
        ].map((example, idx) => (
          <div
            key={idx}
            className="bg-[#2f2f2f] px-4 py-2 rounded-xl text-sm text-gray-300 cursor-pointer 
                       hover:bg-[#3a3a3a] hover:scale-105 transition-all shadow-md"
          >
            {example}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WelcomeScreen;
