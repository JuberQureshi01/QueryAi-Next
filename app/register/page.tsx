"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/register", {
        email,
        password,
      });

      if (res.status === 201) {
        toast.success("Successully Register Login to continue ", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        router.push("/login");
      }
    } catch (err: unknown) {
      if (typeof err === "string") {
        setError("Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#212121] text-gray-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#171717] rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">
          Create an Account
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6+ characters"
              required
              className="w-full px-4 py-3 mt-2 bg-[#212121] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600"
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-zinc-600 rounded-lg hover:bg-zinc-300 transition"
          >
            Create Account
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-500 hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
