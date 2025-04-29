import mongoose from "mongoose";

export interface User {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  age: number;
  phone: string;
  gender: string;
  address: {
    street: string;
    district: string;
    taluka: string;
    state: string;
    country: string;
  };
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
  profileImage?: string;
  bio?: string;
  languages?: string[];
  destinations?: string[];
  travelDates?: {
    start: Date;
    end: Date;
  };
  budget?: string;
  travelStyle?: string;
  interests?: string[];
  preferredCompanion?: string;
  season?: string;
  spontaneity?: string;
  connectWithOthers?: string;
  isVerified?: boolean;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  ratings: [
    {
      user: User;
      rating: number;
      review: string;
    }
  ];
}
