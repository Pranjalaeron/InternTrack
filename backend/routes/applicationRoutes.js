const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createApplication,
  getApplications,
  deleteApplication,
  updateApplication,
} = require("../controllers/applicationController");

router.post("/", protect, createApplication);

router.get("/", protect, getApplications);

router.delete("/:id", protect, deleteApplication);
router.put("/:id", protect, updateApplication);

module.exports = router;
