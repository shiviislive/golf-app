const User = require("../models/user.model");

exports.addScore = async (req, res) => {
  try {
    const { score } = req.body;

    if (score < 1 || score > 45) {
      return res.status(400).json({ message: "Score must be 1-45" });
    }

    const user = await User.findById(req.user.id);

    // max 5 scores
    if (user.scores.length === 5) {
      user.scores.shift(); 
    }

    user.scores.push(score);
    await user.save();

    res.json({
      message: "Score added",
      scores: user.scores
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getScores = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      scores: user.scores
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};