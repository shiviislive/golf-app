const express = require("express");
const router = express.Router();

const {
  getDashboard,
  selectCharity
} = require("../controllers/user.controller");

const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/dashboard", authMiddleware, getDashboard);
router.post("/charity", authMiddleware, selectCharity);

module.exports = router;