import Chat from "@/model/Chat";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { chat, message, user } = await req.json();
  if (!chat || !message || !user) {
    return NextResponse.json(
      { message: "All Fields are required" },
      { status: 500 }
    );
  }
  try {
    const existingChat = await Chat.findOne({ _id: chat._id });
    const newMessage = {
      sender: user,
      message: message,
    };
    existingChat.messages.push(newMessage);
    await existingChat.save();
    return NextResponse.json({ message: "Message Posted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Oopps!! Something went wrong!!!" },
      { status: 500 }
    );
  }
}
