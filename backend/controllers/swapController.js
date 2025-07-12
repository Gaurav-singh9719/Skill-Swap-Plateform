import SwapRequest from "../models/swapRequest.model.js";


export const createSwap = async (req, res) => {
  const { toUser, skillOffered, skillRequested } = req.body;
  const swap = await SwapRequest.create({
    fromUser: req.user.id,
    toUser,
    skillOffered,
    skillRequested
  });
  res.json(swap);
};

export const getMySwaps = async (req, res) => {
  const swaps = await SwapRequest.find({
    $or: [ { fromUser: req.user.id }, { toUser: req.user.id } ]
  }).populate('fromUser toUser', 'name');
  res.json(swaps);
};

export const updateSwapStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedSwap = await SwapRequest.findByIdAndUpdate(id, { status }, { new: true });
  res.json(updatedSwap);
};

export const deleteSwap = async (req, res) => {
  const swap = await SwapRequest.findOne({ _id: req.params.id, fromUser: req.user.id, status: 'pending' });
  if (!swap) return res.status(403).json({ msg: 'Not allowed to delete' });
  await SwapRequest.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Swap deleted' });
};
