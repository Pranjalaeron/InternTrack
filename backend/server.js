const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const gmailRoutes = require("./routes/gmailRoutes");
const emailRoutes = require("./routes/emailRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const connectDB = require("./config/db");

// Start cron job
require("./jobs/gmailJob");

connectDB()
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((err) => {
    console.log("DB ERROR:", err);
  });

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://intern-track-nine-mu.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/gmail", gmailRoutes);
app.use("/api/emails", emailRoutes);

app.get("/", (req, res) => {
  res.send("InternTrack Backend Running 🚀");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
