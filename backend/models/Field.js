const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema({
  name: String,
  water: Number,
  status: Boolean
});

module.exports = mongoose.model("Field", FieldSchema);