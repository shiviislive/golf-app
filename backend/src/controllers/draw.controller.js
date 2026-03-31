const User = require("../models/user.model");
const Draw = require("../models/draw.model");

function generateNumbers() {
  let arr = [];

  while (arr.length < 5) {
    let num = Math.floor(Math.random() * 45) + 1;
    if (!arr.includes(num)) arr.push(num);
  }

  return arr;
}


exports.runDraw = async (req, res) => {
  try {
    const users = await User.find();

    const numbers = generateNumbers();
    let winners = [];

    users.forEach(user => {
      const matches = user.scores.filter(s => numbers.includes(s)).length;

      if (matches >= 3) {
        winners.push({
          user: user._id,
          matchCount: matches
        });
      }
    });

    const draw = await Draw.create({ numbers, winners });

    res.json({
      message: "Draw completed",
      draw
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDraws = async (req, res) => {
  try {
    const draws = await Draw.find()
      .populate("winners.user", "email");

    res.json({ draws });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};