const { google } = require("googleapis");
const oauth2Client = require("../config/googleOAuth");
const User = require("../models/User");

exports.connectGmail = async (req, res) => {
  try {
    const url = oauth2Client.generateAuthUrl({
      state: req.user.id,
      access_type: "offline",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    });

    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.gmailCallback = async (req, res) => {
  try {
    const { code, state } = req.query;

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const googleUser = await oauth2.userinfo.get();

    const user = await User.findById(state);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.gmailConnected = true;
    user.gmailEmail = googleUser.data.email;

    user.googleAccessToken = tokens.access_token || "";

    user.googleRefreshToken = tokens.refresh_token || "";

    await user.save();

    res.redirect("http://localhost:5173/profile");
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
