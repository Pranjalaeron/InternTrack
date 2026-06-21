const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  connectGmail,
  gmailCallback,
  getEmails,
} = require("../controllers/gmailController");

router.get("/emails", protect, getEmails);

router.get("/connect", connectGmail);

router.get(
  "/callback",
  (req, res, next) => {
    console.log("CALLBACK ROUTE HIT");
    next();
  },
  gmailCallback,
);

module.exports = router;
