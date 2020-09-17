const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memoriesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    memoryDate: {
      required: true,
      type: Date,
    },
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Memories = mongoose.model("Memories", memoriesSchema);
