import Hotel from "@/model/Hotel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { newDealer } = await req.json();
  try {
    const dealer = new Hotel({
      ...newDealer,
    });
    await dealer.save();
    return NextResponse.json({ message: "New hotel added" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error adding new hotel" },
      { status: 500 }
    );
  }
}
