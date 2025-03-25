import mongoose, { Schema } from "mongoose";

const TripSchema = new Schema({
  type: {
    type: String,
    require: true,
  },
  planner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  destination: {
    type: Schema.Types.ObjectId,
    ref: "SuggestedLocation",
    require: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
  },
  carService: {
    type: Schema.Types.ObjectId,
    ref: "Car",
  },
  startDate: {
    type: Date,
    require: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
});

const Trip = mongoose.models.Trip || mongoose.model("Trip", TripSchema);
export default Trip;
