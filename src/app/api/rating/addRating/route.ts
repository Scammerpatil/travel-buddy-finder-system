import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/model/User";

export async function POST(req: NextRequest) {
  const { rating, anotheruser } = await req.json();
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("/login");
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const existingUser = await User.findOne({ _id: anotheruser });
    const newRating = {
      user: user.id,
      rating: rating.rating,
      review: rating.review,
    };
    existingUser.ratings.push(newRating);
    await existingUser.save();
    return NextResponse.json({ message: "Rating added successfully" });
  } catch (error) {
    console.error("Error adding rating:", error);
    return NextResponse.json(
      { message: "Error adding rating" },
      { status: 500 }
    );
  }
}
