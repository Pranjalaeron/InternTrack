const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
const existingUser = await User.findOne({
  email,
});

if (existingUser) {
  return res.status(400).json({
    message: "User already exists",
  });
}

const hashedPassword = await bcrypt.hash(
  password,
  10,
);

const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

res.status(201).json({
  message: "Signup Successful",
  user,
});
;
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
const user = await User.findOne({
  email,
});

if (!user) {
  return res.status(400).json({
    message: "User not found",
  });
}

const isMatch = await bcrypt.compare(
  password,
  user.password,
);

if (!isMatch) {
  return res.status(400).json({
    message: "Invalid password",
  });
}

const token = jwt.sign(
  {
    id: user._id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  },
);

res.status(200).json({
  message: "Login Successful",
  token,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    college: user.college,
    branch: user.branch,
    resume: user.resume,
  },
});
;
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    
res.status(200).json(user);
;
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    
if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

user.name =
  req.body.name ?? user.name;

user.email =
  req.body.email ?? user.email;

user.college =
  req.body.college ?? user.college;

user.branch =
  req.body.branch ?? user.branch;

user.resume =
  req.body.resume ?? user.resume;

if (req.body.password) {
  user.password = await bcrypt.hash(
    req.body.password,
    10,
  );
}

const updatedUser =
  await user.save();

res.status(200).json({
  _id: updatedUser._id,
  name: updatedUser.name,
  email: updatedUser.email,
  college: updatedUser.college,
  branch: updatedUser.branch,
  resume: updatedUser.resume,
  createdAt: updatedUser.createdAt,
});
;
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
