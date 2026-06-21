const { google } = require("googleapis");
const User = require("../models/User");
const oauth2Client = require("../config/googleOAuth");

exports.getEmails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.googleRefreshToken) {
      return res.status(400).json({
        message: "Gmail not connected",
      });
    }

    oauth2Client.setCredentials({
      refresh_token: user.googleRefreshToken,
    });

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
    });

    res.json(response.data.messages || []);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
