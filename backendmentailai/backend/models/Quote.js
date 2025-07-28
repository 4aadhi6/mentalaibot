const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Quote", QuoteSchema);
