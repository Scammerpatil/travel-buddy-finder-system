import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
  messages: [
    {
      sender: { type: Schema.Types.ObjectId, ref: "User" },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
export default Chat;
