import dbConfig from "@/middlewares/db.config";
import Chat from "@/model/Chat";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { sender, receiver } = await req.json();
  if (!sender || !receiver) {
    return NextResponse.json(
      { message: "Sender and Receiver are required" },
      { status: 400 }
    );
  }
  try {
    const chat = await Chat.findOne({
      users: { $all: [sender, receiver] },
    })
      .populate("users")
      .populate("messages.sender");
    if (chat) {
      return NextResponse.json({ chat }, { status: 200 });
    }
    const newChat = new Chat({
      users: [sender, receiver],
    });
    await newChat.save();
    return NextResponse.json({ chat: newChat }, { status: 201 });
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json(
      { message: "Error creating chat" },
      { status: 500 }
    );
  }
}
