const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const applicationRoutes = require("./routes/applicationRoutes");

const connectDB = require("./config/db");

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

app.get("/", (req, res) => {
  res.send("InternTrack Backend Running 🚀");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
