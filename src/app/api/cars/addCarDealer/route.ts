import Car from "@/model/Car";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { newDealer } = await req.json();
  try {
    const newCar = new Car({
      ...newDealer,
    });
    await newCar.save();
    return NextResponse.json({ message: "New car added" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error adding new car" },
      { status: 500 }
    );
  }
}
