const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema({
  
  numbers: [
    {
      type: Number,
      required: true
    }
  ], 

  winners: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      matchCount: {
        type: Number
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model("Draw", drawSchema);