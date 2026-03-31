const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  isSubscribed: {
    type: Boolean,
    default: false
  },

  charity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Charity"
  },

  charityPercentage: {
    type: Number,
    default: 10
  },

  scores: [
    {
      type: Number,
      min: 1,
      max: 45
    }
  ]

}, { timestamps: true });


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});


userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);