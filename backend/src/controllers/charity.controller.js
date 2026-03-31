const Charity = require("../models/charity.model");

exports.createCharity = async (req, res) => {
  try {
    const { name, description } = req.body;

    const charity = await Charity.create({ name, description });

    res.json({
      message: "Charity created",
      charity
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getCharities = async (req, res) => {
  try {
    const charities = await Charity.find();

    res.json({ charities });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};