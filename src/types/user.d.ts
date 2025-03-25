import mongoose from "mongoose";

export interface User {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  phone: string;
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
  address: {
    street: string;
    district: string;
    taluka: string;
    state: string;
    country: string;
  };
  languages?: string[];
  profileImage?: string;
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
  ratings: [
    {
      user: User;
      rating: number;
      review: string;
    }
  ];
}
