const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: String,
  content: String,
  type: String, // sell / buy / general
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema);