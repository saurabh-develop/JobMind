import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    aliases: [
      {
        type: String,
        index: true,
      },
    ],
    category: {
      type: String, // Frontend, Backend, DevOps, AI
    },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
