"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/chat");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#212121] text-gray-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#171717] rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-semibold">Email Address</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 mt-2 bg-[#212121] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 mt-2 bg-[#212121] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600"
            />
          </div>
          {error && <p className="text-red-400 text-center text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-zinc-600 rounded-lg hover:bg-zinc-300 transition"
          >
            Log In
          </button>
        </form>
        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-full bg-gray-600"></span>
          <span className="text-gray-400 text-sm">OR</span>
          <span className="h-px w-full bg-gray-600"></span>
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/chat" })}
          className="w-full flex items-center justify-center gap-3 py-3 font-semibold text-gray-800 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 transition shadow-sm"
        >
          <i className="fa-brands fa-google w-5 h-5"></i>
          <span>Continue with Google</span>
        </button>
        <p className="text-sm text-center text-gray-400">
          Dont have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
