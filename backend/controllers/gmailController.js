const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const oauth2Client = require("../config/googleOAuth");
const User = require("../models/User");

exports.connectGmail = async (req, res) => {
  try {
    const token = req.query.token;

    console.log("TOKEN:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      state: token,
      scope: [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    });

    console.log("GOOGLE URL:", url);

    res.redirect(url);
  } catch (error) {
    console.log("CONNECT ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.gmailCallback = async (req, res) => {
  try {
    console.log("QUERY:", req.query);

    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({
        message: "Authorization code missing",
      });
    }

    console.log("CODE:", code);
    console.log("STATE:", state);

    const tokenResponse = await oauth2Client.getToken(code);

    console.log("TOKEN RESPONSE:", tokenResponse);

    const tokens = tokenResponse.tokens;

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const googleUser = await oauth2.userinfo.get();

    console.log("GOOGLE USER:", googleUser.data);

    const decoded = jwt.verify(state, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    const user = await User.findById(decoded.id);

    console.log("USER:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.gmailConnected = true;
    user.gmailEmail = googleUser.data.email;
    user.googleAccessToken = tokens.access_token || "";
    user.googleRefreshToken = tokens.refresh_token || "";

    console.log("BEFORE SAVE");

    await user.save();

    console.log("AFTER SAVE");

    console.log("GMAIL CONNECTED SUCCESSFULLY");

    res.redirect("http://localhost:5173/profile");
  } catch (error) {
    console.log("CALLBACK ERROR:");
    console.log(error);

    if (error.stack) {
      console.log(error.stack);
    }

    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getEmails = async (req, res) => {
  try {
    console.log("REQ USER:", req.user);

    const user = await User.findById(req.user.id);

    console.log("DB USER:", user);

    oauth2Client.setCredentials({
      access_token: user.googleAccessToken,
      refresh_token: user.googleRefreshToken,
    });

    console.log("TOKENS SET");

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
    });

    console.log("LIST RESPONSE:");
    console.log(response.data);

    const messages = response.data.messages || [];

    console.log("MESSAGES:", messages);

    const emailData = [];

    for (const msg of messages) {
      const email = await gmail.users.messages.get({
        userId: "me",
        id: msg.id,
      });

      console.log("EMAIL:", email.data);

      const headers = email.data.payload.headers;

      const subject =
        headers.find((h) => h.name === "Subject")?.value || "No Subject";

      const from = headers.find((h) => h.name === "From")?.value || "Unknown";

      emailData.push({
        id: msg.id,
        subject,
        from,
        snippet: email.data.snippet,
      });
    }

    console.log("FINAL DATA:", emailData);

    res.json(emailData);
  } catch (error) {
    console.log("EMAIL ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};