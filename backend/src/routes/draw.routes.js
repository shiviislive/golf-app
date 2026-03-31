const express = require("express");
const router = express.Router();

const {
  runDraw,
  getDraws
} = require("../controllers/draw.controller");

const { authMiddleware } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/isAdmin.middleware");

router.post("/", authMiddleware, isAdmin, runDraw);

router.get("/", authMiddleware, getDraws);

module.exports = router;