import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6 sm:px-20">
      <header className="mb-12 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">
          Welcome to Query AI
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl">
          Explore, chat, and generate images with AI
        </p>
      </header>

      <main className="flex flex-col items-center gap-8">
        <Image
          src="/blacklogo.png"
          alt="Logo"
          width={200}
          height={200}
          className=" hover:animate-spin "
        />
        <span className="text-gray-500 animate-pulse duration-100">
          Hover on me
        </span>

        <div className="flex flex-col">
          <p className="text-center text-gray-200 text-base sm:text-lg max-w-md">
            Ask, Explore, Create — AI at Your Fingertips
          </p>
          <p className="text-center text-gray-100 text-base sm:text-md max-w-md">
            Smart Conversations, Smarter Answers
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            <Link href="/chat">Get Started</Link>
          </button>
          <button className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
            Learn More
          </button>
        </div>
      </main>

      <footer className="mt-12 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()}Query AI. All rights reserved.
      </footer>
    </div>
  );
}
