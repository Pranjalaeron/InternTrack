const Application = require("../models/Application");

// Create Application
exports.createApplication = async (req, res) => {
  try {
    const { company, role, status, deadline, notes } = req.body;

    
const application = await Application.create({
  company,
  role,
  status,
  deadline,
  notes,
  user: req.user.id,
});

res.status(201).json(application);
;
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    
res.status(200).json(applications);
;
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Application
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    
if (!application) {
  return res.status(404).json({
    message: "Application not found",
  });
}

res.status(200).json({
  message: "Application deleted successfully",
});
;
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Application
exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    
if (!application) {
  return res.status(404).json({
    message: "Application not found",
  });
}

application.status =
  req.body.status || application.status;

application.notes =
  req.body.notes !== undefined
    ? req.body.notes
    : application.notes;

const updatedApplication =
  await application.save();

res.status(200).json(updatedApplication);
;
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
