const cron = require("node-cron");
const User = require("../models/User");
const Application = require("../models/Application");
const { google } = require("googleapis");
const oauth2Client = require("../config/googleOAuth");

cron.schedule("*/5 * * * *", async () => {
  try {
    console.log("Checking emails...");

    const users = await User.find({
      gmailConnected: true,
    });

    console.log("Connected users:", users.length);

    for (const user of users) {
      console.log("Checking:", user.gmailEmail);

      oauth2Client.setCredentials({
        access_token: user.googleAccessToken,
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

      const messages = response.data.messages || [];

      for (const msg of messages) {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
        });

        const headers =
          email.data.payload?.headers ||
          email.data.payload?.parts?.[0]?.headers ||
          [];

        const subject = headers.find((h) => h.name === "Subject")?.value || "";

        const from = headers.find((h) => h.name === "From")?.value || "";
        let companyName = from.split("<")[0].trim();

        companyName = companyName
          .replace("Careers", "")
          .replace("Jobs", "")
          .trim();

          await Application.create({
            user: user._id,
            company: companyName,
            role: subject,
            status,
            deadline: null,
            notes: snippet,
            gmailId: msg.id,
          });

        const snippet = email.data.snippet || "";

        // Ignore promotional senders
        const ignoreSenders = [
          "resumeworded",
          "openai",
          "chatgpt",
          "naukri",
          "unstop.news",
        ];

        if (
          ignoreSenders.some((sender) => from.toLowerCase().includes(sender))
        ) {
          continue;
        }

        // Ignore emails without subject
        if (!subject) {
          continue;
        }

        console.log("----------------");
        console.log("Subject:", subject);
        console.log("From:", from);

        const text = (subject + " " + snippet).toLowerCase();

        const internshipKeywords = [
          "intern",
          "internship",
          "application received",
          "application status",
          "interview invitation",
          "job application",
          "offer letter",
          "selected",
          "shortlisted",
          "rejected",
          "regret",
        ];

        const isInternshipEmail = internshipKeywords.some((keyword) =>
          text.includes(keyword),
        );

        if (!isInternshipEmail) {
          continue;
        }

        let status = "Applied";

        if (
          text.includes("interview invitation") ||
          text.includes("technical interview") ||
          text.includes("interview round")
        ) {
          status = "Interview";
        } else if (text.includes("offer letter") || text.includes("selected")) {
          status = "Offer";
        } else if (text.includes("rejected") || text.includes("regret")) {
          status = "Rejected";
        }

        console.log("Internship Email Found:", status);

        // Prevent duplicate entries
        const exists = await Application.findOne({
          gmailId: msg.id,
        });

        if (exists) {
          continue;
        }

        await Application.create({
          user: user._id,
          company: from,
          role: subject,
          status,
          deadline: null,
          notes: snippet,
          gmailId: msg.id,
        });

        console.log("Application Created");
      }
    }
  } catch (error) {
    console.log("CRON ERROR:");
    console.log(error.message);
  }
});
