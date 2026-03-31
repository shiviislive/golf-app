const express = require("express");
const router = express.Router();

const {
  addScore,
  getScores
} = require("../controllers/score.controller");

const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/", authMiddleware, addScore);
router.get("/", authMiddleware, getScores);

module.exports = router; 