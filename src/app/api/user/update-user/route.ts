import jwt from "jsonwebtoken";
import dbConfig from "@/middlewares/db.config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/User";

dbConfig();

export async function PUT(req: NextRequest) {
  const { answers } = await req.json();
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const userId = data.id;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    user.destinations = answers.destinations || user.destinations;
    user.interests = answers.interests || user.interests;
    user.season = answers.season || user.season;
    user.spontaneity = answers.spontaneity || user.spontaneity;
    user.connectWithOthers =
      answers.connectWithOthers || user.connectWithOthers;
    user.travelStyle = answers.travelStyle || user.travelStyle;
    user.languages = answers.languages || user.languages;
    await user.save();
    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
