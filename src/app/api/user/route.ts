import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/model/User";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/login");
  }
  const data = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  const user = await User.find({ _id: { $ne: data.id } });
  return NextResponse.json({ matches: user }, { status: 200 });
}
