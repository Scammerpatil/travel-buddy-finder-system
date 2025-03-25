import dbConfig from "@/middlewares/db.config";
import SuggestedLocation from "@/model/SuggestedLocation";
import { NextRequest, NextResponse } from "next/server";
dbConfig();
export async function GET(req: NextRequest) {
  const locations = await SuggestedLocation.find();
  return NextResponse.json(locations);
}
