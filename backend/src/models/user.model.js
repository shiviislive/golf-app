const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  isSubscribed: { type: Boolean, default: false },
  charity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Charity"
  },
  charityPercentage: { type: Number, default: 10 },
  scores: [{ type: Number, min: 1, max: 45 }]
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return ;
  this.password = await bcrypt.hash(this.password, 10);
  return;
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;