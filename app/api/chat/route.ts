import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import Thread from "@/model/Thread";
import {getGeminiAPIResponse}  from "@/lib/gemini";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { message, threadId } = await request.json();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let thread = await Thread.findOne({ threadId, userId: user._id });

    if (!thread) {
      thread = new Thread({
        userId: user._id,
        threadId,
        title: message.substring(0, 30), 
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

   

    const assistantReply = await getGeminiAPIResponse(message);
    if (!assistantReply) {
      return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 });
    }

    thread.messages.push({ role: "assistant", content: assistantReply });

    await thread.save();

    return NextResponse.json({ reply: assistantReply });
  } catch (error) {
    return NextResponse.json({ error: "Server error ",err:error }, { status: 500 });
  }
}