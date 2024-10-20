// models/Note.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false, // Assuming notes are not verified by default
    },
    coverImage: {
      type: String, // Store the URL or path of the cover image
      required: true,
    },
    images: {
      type: [String], // Array of additional image URLs or paths
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
