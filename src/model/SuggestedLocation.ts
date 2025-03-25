import mongoose, { Schema } from "mongoose";

const SuggestedLocationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["beach", "mountain", "city", "desert", "forest"],
  },
  rating: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  bestTimeToVisit: {
    type: String,
    required: true,
    enum: ["summer", "winter", "spring", "autumn"],
  },
  activities: {
    type: [String],
    required: true,
  },
  coordinator: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
});

const SuggestedLocation =
  mongoose.models.SuggestedLocation ||
  mongoose.model("SuggestedLocation", SuggestedLocationSchema);

export default SuggestedLocation;
