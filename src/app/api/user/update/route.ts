import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { formData } = await req.json();
  try {
    await User.findOneAndUpdate(
      { email: formData.email },
      { $set: formData },
      { new: true }
    );
    return NextResponse.json({ message: "User Updated" });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
