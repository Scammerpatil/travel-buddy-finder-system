import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/middlewares/db.config";
import jwt from "jsonwebtoken";
import User from "@/model/User";

dbConfig();

const generateToken = (data: object) => {
  return jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "1d" });
};

const setTokenCookie = (response: NextResponse, token: string) => {
  response.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
};

export async function POST(req: NextRequest) {
  const { formData } = await req.json();

  if (!formData.email || !formData.password) {
    return NextResponse.json(
      { message: "Please fill all the fields", success: false },
      { status: 400 }
    );
  }

  if (
    formData.email === process.env.ADMIN_EMAIL ||
    formData.password === process.env.ADMIN_PASSWORD
  ) {
    const data = {
      id: "admin",
      role: "admin",
      email: process.env.ADMIN_EMAIL,
      name: "Admin",
      profileImage:
        "https://images.freeimages.com/fic/images/icons/2526/bloggers/256/admin.png",
      isVerified: true,
    };
    const token = generateToken(data);
    const response = NextResponse.json({
      message: "Login Success",
      success: true,
      route: `/admin/dashboard`,
      user: data,
    });
    setTokenCookie(response, token);
    return response;
  }

  // User login logic
  const user = await User.findOne({ email: formData.email });
  if (!user) {
    return NextResponse.json(
      { message: "User not found", success: false },
      { status: 400 }
    );
  }
  const isPasswordValid = await bcryptjs.compare(
    formData.password,
    user.password
  );

  if (isPasswordValid) {
    const data = {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
      profilImage: user.profileImage,
      isVerified: user.isVerified,
    };
    const token = generateToken(data);
    const response = NextResponse.json({
      message: "Login Success",
      success: true,
      route: `/user/dashboard`,
      user,
    });
    setTokenCookie(response, token);
    return response;
  } else {
    return NextResponse.json(
      { message: "Invalid Credentials", success: false },
      { status: 400 }
    );
  }
}
