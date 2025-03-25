import Car from "@/model/Car";
import { NextResponse } from "next/server";

export async function GET() {
  const cars = await Car.find();
  return NextResponse.json(cars);
}
