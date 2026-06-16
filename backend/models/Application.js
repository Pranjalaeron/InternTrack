const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},


company: {
  type: String,
  required: true,
  trim: true,
},

role: {
  type: String,
  required: true,
  trim: true,
},

status: {
  type: String,
  enum: ["Applied", "Interview", "Offer", "Rejected"],
  default: "Applied",
},

deadline: {
  type: Date,
  required: true,
},

notes: {
  type: String,
  default: "",
  trim: true,
},


},
{
timestamps: true,
},
);

module.exports = mongoose.model(
"Application",
applicationSchema,
);
