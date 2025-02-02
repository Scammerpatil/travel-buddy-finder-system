import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  mobileNumber: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  location: {
    type: String,
  },
  languages: [{ type: String }],
  profilePic: { type: String },
  bio: { type: String },

  // Travel Preferences
  destinations: [{ type: String }],
  travelDates: {
    start: { type: Date },
    end: { type: Date },
  },
  budget: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },
  travelStyle: {
    type: String,
    enum: ["Backpacking", "Luxury", "Adventure", "Cultural"],
  },
  interests: [{ type: String }],
  preferredCompanion: {
    type: String,
    enum: ["Anyone", "Same Gender", "Small Group", "Large Group"],
  },

  // Safety Features
  isVerified: { type: Boolean, default: false },
  emergencyContact: {
    name: { type: String },
    phone: { type: String },
    relationship: { type: String },
  },

  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
