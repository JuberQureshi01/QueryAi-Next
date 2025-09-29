
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import Thread from "@/model/Thread";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const threads = await Thread.find({ userId: user._id }).sort({ updatedAt: -1 });
    const filteredThreads = threads.map(thread => ({
        threadId: thread.threadId,
        title: thread.title
    }));

    return NextResponse.json(filteredThreads);
  } catch (error:unknown) {
    if (typeof error === "string") {
      return "check";
    } else {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }
}