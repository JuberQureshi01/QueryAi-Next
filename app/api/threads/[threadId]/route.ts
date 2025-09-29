import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import Thread from "@/model/Thread";

export async function GET(
  request: NextRequest,
  { params }: { params: { threadId: string } }
): Promise<NextResponse> {
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

    const thread = await Thread.findOne({
      threadId: params.threadId,
      userId: user._id,
    });

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }

    return NextResponse.json(thread.messages);
  } catch (error) {
    console.error("GET /threads/[threadId] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { threadId: string } }
): Promise<NextResponse> {
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

    await Thread.findOneAndDelete({
      threadId: params.threadId,
      userId: user._id,
    });

    return NextResponse.json({ message: "Thread deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /threads/[threadId] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
