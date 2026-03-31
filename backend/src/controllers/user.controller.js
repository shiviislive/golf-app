const User = require("../models/user.model");

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("charity", "name");

    res.json({
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.selectCharity = async (req, res) => {
  try {
    const { charityId } = req.body;

    const user = await User.findById(req.user.id);
    user.charity = charityId;

    await user.save();

    res.json({ message: "Charity selected" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};