import Car from "@/model/Car";
import Hotel from "@/model/Hotel";
import SuggestedLocation from "@/model/SuggestedLocation";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const users = await User.find();
    const cars = await Car.find();
    const hotels = await Hotel.find();
    const destinations = await SuggestedLocation.find();
    return NextResponse.json(
      { users, cars, hotels, destinations },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
