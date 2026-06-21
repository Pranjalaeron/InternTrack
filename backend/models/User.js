const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    college: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    gmailConnected: {
      type: Boolean,
      default: false,
    },

    gmailEmail: {
      type: String,
      default: "",
    },

    googleAccessToken: {
      type: String,
      default: "",
    },

    googleRefreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
