import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Trip from "@/model/Trip";

export async function POST(req: NextRequest) {
  const { trip } = await req.json();
  const token = req.cookies.get("token")?.value || "";
  const user = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  try {
    if (trip.type === "solo") {
      const newTrip = new Trip({ ...trip, planner: user.id });
      await newTrip.save();
    }
    const newTrip = new Trip({ ...trip, planner: user.id });
    await newTrip.save();
    return NextResponse.json(
      { message: "Trip created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error making trip:", error);
    return NextResponse.json({ message: "Error making trip" }, { status: 500 });
  }
}
