const { Schema, model } = require("mongoose");

const Memory = new Schema(
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
    },
    longitude: {
      type: Number,
      required: true,
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

module.exports = model("Memories", userSchema);
