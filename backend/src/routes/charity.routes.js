const express = require("express");
const router = express.Router();

const {
  createCharity,
  getCharities
} = require("../controllers/charity.controller");

const { authMiddleware } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/isAdmin.middleware");

router.post("/", authMiddleware, isAdmin, createCharity);

router.get("/", authMiddleware, getCharities);

module.exports = router;