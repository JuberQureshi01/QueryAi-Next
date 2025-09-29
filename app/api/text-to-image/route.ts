import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { getClipdropImageResponse } from "@/lib/gemini";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import Thread from "@/model/Thread";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { prompt, style, threadId } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "A prompt is required." }, { status: 400 });
    }
    if (!threadId) {
      return NextResponse.json({ error: "A thread ID is required." }, { status: 400 });
    }
    
    await dbConnect();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const imageStyle = style || 'photorealistic'; 
    const fullUserPrompt = `/imagine ${prompt}`;

    let thread = await Thread.findOne({ threadId: threadId, userId: user._id });

    const imageUrl = await getClipdropImageResponse(prompt, imageStyle);

    if (!imageUrl) {
      return NextResponse.json({ error: "Failed to generate image from external service." }, { status: 500 });
    }

    const userMessage = { role: "user" as const, content: fullUserPrompt };
    const assistantMessage = { role: "assistant" as const, content: imageUrl };

    if (!thread) {
      thread = new Thread({
        userId: user._id,
        threadId: threadId,
        title: fullUserPrompt.substring(0, 30),
        messages: [userMessage, assistantMessage],
      });
    } else {
      thread.messages.push(userMessage, assistantMessage);
    }
    
    await thread.save();

    return NextResponse.json({ imageUrl });
    
  } catch (error) {
    console.error("Clipdrop API Route Error:", error);
    return NextResponse.json({ error: "Server error generating image." }, { status: 500 });
  }
}

