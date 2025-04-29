import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/model/User";
import { User as UserType } from "@/types/user";
import { createObjectCsvWriter } from "csv-writer";
import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Session Expired" }, { status: 401 });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };
    if (!data) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const allUsers = await User.find();
    const csvPath = "python/user.csv";
    const csvWriter = createObjectCsvWriter({
      path: csvPath,
      header: [
        { id: "_id", title: "id" },
        { id: "age", title: "age" },
        { id: "gender", title: "gender" },
        { id: "budget", title: "budget" },
        { id: "travelStyle", title: "travelStyle" },
        { id: "preferredCompanion", title: "preferredCompanion" },
        { id: "season", title: "season" },
        { id: "spontaneity", title: "spontaneity" },
        { id: "connectWithOthers", title: "connectWithOthers" },
      ],
    });

    await csvWriter.writeRecords(allUsers);
    const { stdout, stderr } = await execAsync(
      `py -3.12 python/match_maker.py ${user}`
    );
    return NextResponse.json({ matches: stdout }, { status: 200 });
  } catch (err) {
    console.error("Error in GET /matches:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const findMatches = async (user: UserType) => {
  const potentialMatches = await User.find({ _id: { $ne: user._id } });
  const matches = [];

  for (const matchUser of potentialMatches) {
    const matchScore = calculateMatchScore(user, matchUser);
    matches.push({ user: matchUser, score: matchScore });
  }

  matches.sort((a, b) => b.score - a.score);

  return matches;
};

const calculateMatchScore = (user1: UserType, user2: UserType) => {
  let score = 0;

  if (
    user1?.destinations?.some((dest) => user2?.destinations?.includes(dest))
  ) {
    score += 50;
  }

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

  if (user1.budget && user1.budget === user2.budget) {
    score += 10;
  }

  const commonInterests = user1?.interests?.filter((interest) =>
    user2?.interests?.includes(interest)
  );
  if (commonInterests && commonInterests.length > 0) {
    score += (commonInterests.length / user1.interests?.length!) * 15;
  }

  if (
    user1.preferredCompanion === "Anyone" ||
    user2.preferredCompanion === "Anyone" ||
    user1.preferredCompanion === user2.gender
  ) {
    score += 5;
  }

  if (user1.travelStyle && user1.travelStyle === user2.travelStyle) {
    score += 5;
  }

  if (user1.season && user1.season === user2.season) {
    score += 3;
  }

  if (user1.spontaneity && user1.spontaneity === user2.spontaneity) {
    score += 3;
  }

  if (user1.connectWithOthers === "Yes" && user2.connectWithOthers === "Yes") {
    score += 2;
  }

  return score;
};
