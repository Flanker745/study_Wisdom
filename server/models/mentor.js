// models/Mentor.js
const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // 'users' must match the collection name used in the User model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    price: {
      videoCall: {
        type: Number,
        required: true,
      },
      call: {
        type: Number,
        required: true,
      },
      chat: {
        type: Number,
        required: true,
      },
    },
    qualification: {
      type: String,
      required: true,
    },
    availabilityDays: {
      type: [String],
      required: true,
    },
    availabilityTime: {
      start: {
        type: String, // You can change this to Date if needed
        required: true,
      },
      end: {
        type: String, // You can change this to Date if needed
        required: true,
      },
    },
    whatsappNumber: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean, // Changed from String to Boolean
      default: true, // You can set a default value if needed
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mentor", mentorSchema);
