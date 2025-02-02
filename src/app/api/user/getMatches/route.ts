import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/model/User";
import Match from "@/model/Matches";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Session Expired" }, { status: 401 });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    if (!data) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const matches = await findMatches(user._id);
    return NextResponse.json({ matches });
  } catch (err) {
    console.error("Error in GET /matches:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const findMatches = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const potentialMatches = await User.find({ _id: { $ne: userId } });
  const matches = [];

  for (const matchUser of potentialMatches) {
    const matchScore = calculateMatchScore(user, matchUser);
    if (matchScore >= 70) {
      // Check if the match already exists
      const existingMatch = await Match.findOne({
        $or: [
          { user1: userId, user2: matchUser._id },
          { user1: matchUser._id, user2: userId },
        ],
      });

      if (!existingMatch) {
        matches.push({ user1: userId, user2: matchUser._id, matchScore });
      }
    }
  }

  // Insert only new matches
  if (matches.length > 0) {
    await Match.insertMany(matches);
  }

  return matches;
};

const calculateMatchScore = (user1, user2) => {
  let score = 0;

  // Destination Match (50%)
  if (user1.destinations.some((dest) => user2.destinations.includes(dest))) {
    score += 50;
  }

  // Date Overlap (20%) - Ensure dates exist
  if (
    user1.travelDates?.start &&
    user1.travelDates?.end &&
    user2.travelDates?.start &&
    user2.travelDates?.end
  ) {
    const start1 = new Date(user1.travelDates.start);
    const end1 = new Date(user1.travelDates.end);
    const start2 = new Date(user2.travelDates.start);
    const end2 = new Date(user2.travelDates.end);

    if (start1 <= end2 && start2 <= end1) {
      score += 20;
    }
  }

  // Budget Compatibility (10%)
  if (user1.budget === user2.budget) {
    score += 10;
  }

  // Shared Interests (15%)
  // const commonInterests = user1.interests.filter((interest) =>
  //   user2.interests.includes(interest)
  // );
  // if (commonInterests.length > 0) {
  //   score += (commonInterests.length / user1.interests.length) * 15;
  // }

  // Companion Type Preference (5%)
  if (
    user1.preferredCompanion === "Anyone" ||
    user2.preferredCompanion === "Anyone" ||
    user1.preferredCompanion === user2.gender
  ) {
    score += 5;
  }

  return score;
};
