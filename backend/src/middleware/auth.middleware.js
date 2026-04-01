const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.authMiddleware = async (req, res, next) => {
  try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];


    if (!token) {
      return res.status(401).json({
        message: "Unauthorized, token missing"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    req.user = {
      id: user._id,
      role: user.role
    };

    next();

  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized, invalid token"
    });
  }
};