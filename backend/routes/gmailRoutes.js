const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  connectGmail,
  gmailCallback,
} = require("../controllers/gmailController");

router.get("/connect", protect, connectGmail);

router.get("/callback", gmailCallback);

module.exports = router;
