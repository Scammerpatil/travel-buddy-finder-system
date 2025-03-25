import dbConfig from "@/middlewares/db.config";
import Trip from "@/model/Trip";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const data = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  try {
    const trips = await Trip.find({
      $or: [{ planner: data.id }, { members: data.id }],
    })
      .populate("members")
      .populate("hotel")
      .populate("carService")
      .populate("destination")
      .populate("planner");
    return NextResponse.json({ trips }, { status: 200 });
  } catch (error) {
    console.error("Error fetching trips:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
