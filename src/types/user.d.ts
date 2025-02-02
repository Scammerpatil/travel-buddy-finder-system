import mongoose from "mongoose";

export interface User {
  _id?: mongoose.Schema.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  mobileNumber: string;
  location?: string;
  languages?: string[];
  profilePic?: string;
  bio?: string;
  destinations?: string[];
  travelDates?: {
    start: Date;
    end: Date;
  };
  budget?: string;
  travelStyle?: string;
  interests?: string[];
  preferredCompanion?: string;
  isVerified?: boolean;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}
