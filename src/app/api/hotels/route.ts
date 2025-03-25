import Hotel from "@/model/Hotel";
import { NextResponse } from "next/server";

export async function GET() {
  const hotels = await Hotel.find();
  return NextResponse.json(hotels);
}
