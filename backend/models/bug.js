const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
      type: String,
      enum: ['open', 'in-progress', 'resolved'],
      default: 'open',
      lowercase: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bug", bugSchema);
