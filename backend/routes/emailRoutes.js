const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { getEmails } = require("../controllers/emailController");

router.get("/", protect, getEmails);

module.exports = router;
