import User from "../models/user.models.js";


export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
  res.json(updated);
};

export const searchUsers = async (req, res) => {
  const { skill } = req.query;
  const users = await User.find({
    isPublic: true,
    skillsOffered: { $regex: skill, $options: 'i' }
  }).select('-password');
  res.json(users);
};

