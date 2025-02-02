import mongoose from "mongoose";
import { Schema } from "mongoose";

const MatchSchema = new Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  matchScore: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Declined"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Match = mongoose.models.Match || mongoose.model("Match", MatchSchema);
export default Match;
