import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
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
  },
  phone: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  address: {
    street: { type: String },
    district: { type: String },
    taluka: { type: String },
    state: { type: String, default: "Maharashtra" },
    country: { type: String, default: "India" },
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  profileImage: { type: String },
  bio: { type: String },

  languages: [{ type: String }],
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
    enum: ["Anyone", "Solo", "Same Gender", "Small Group", "Large Group"],
  },

  isVerified: { type: Boolean, default: false },
  emergencyContact: {
    name: { type: String },
    phone: { type: String },
    relationship: { type: String },
  },

  ratings: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number },
      review: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
