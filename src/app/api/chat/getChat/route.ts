import Chat from "@/model/Chat";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const data = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  try {
    const chat = await Chat.find({ users: data.id })
      .populate("users", "name email profileImage")
      .sort({ updatedAt: -1 });
    return NextResponse.json({ chat });
  } catch (error) {
    console.error("Error finding chat:", error);
    return NextResponse.json(
      { message: "Error finding chat" },
      { status: 500 }
    );
  }
}
