const mongoose = require("mongoose");

const charitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  image: {
    type: String 
  }

}, { timestamps: true });

module.exports = mongoose.model("Charity", charitySchema);