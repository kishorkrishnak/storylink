const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "content field is required",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Comment", commentSchema);
