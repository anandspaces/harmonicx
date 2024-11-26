import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, rquired: true },
    content: { type: String, required: true },
  }, { timestamps: true }
);