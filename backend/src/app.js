const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173", // local frontend
    "https://golf-app-gamma-two.vercel.app" // deployed frontend
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const scoreRoutes = require("./routes/score.routes");
const drawRoutes = require("./routes/draw.routes");
const charityRoutes = require("./routes/charity.routes");


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/draw", drawRoutes);
app.use("/api/charities", charityRoutes);

app.get("/", (req, res) => {
  res.send("Golf App API is running ");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Server Error",
    error: err.message
  });
});

module.exports = app;