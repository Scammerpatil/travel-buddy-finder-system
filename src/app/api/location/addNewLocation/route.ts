import SuggestedLocation from "@/model/SuggestedLocation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { newLocation } = await req.json();
  try {
    const location = new SuggestedLocation({
      ...newLocation,
    });
    await location.save();
    return NextResponse.json({ message: "New location added" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error adding new location" },
      { status: 500 }
    );
  }
}
