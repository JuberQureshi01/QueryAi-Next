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

    // Fetch all threads for the user, selecting only the necessary fields
    // and sorting by the most recently created
    const threads = await Thread.find({ userId: user._id })
      .select("threadId title")
      .sort({ createdAt: -1 });

    return NextResponse.json(threads);
    
  } catch (error) {
    console.error("GET /api/threads error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
