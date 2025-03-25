import Car from "@/model/Car";
import Hotel from "@/model/Hotel";
import SuggestedLocation from "@/model/SuggestedLocation";
import Trip from "@/model/Trip";
import User from "@/model/User";
import mongoose from "mongoose";

// Database Connection

const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to the Database");
    });
    Car;
    Hotel;
    SuggestedLocation;
    User;
    Trip;
    connection.on("error", (error) => {
      console.log("Error: ", error);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default dbConfig;
