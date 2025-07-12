import SwapRequest from "../models/swapRequest.model.js";

// Create a new swap request
export const createSwap = async (req, res) => {
  try {
    console.log("Creating Swap Request:", req);
     if (!req.body) return res.status(400).json({ msg: 'Request body is empty' });
    const { toUser, skillOffered, skillRequested } = req.body;
     
    if (!toUser || !skillOffered || !skillRequested) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const swap = await SwapRequest.create({
      fromUser: req.user.id,
      toUser,
      skillOffered,
      skillRequested
    });

    res.status(201).json(swap);
  } catch (error) {
    console.error("Create Swap Error:", error.message);
    res.status(500).json({ msg: 'Server error while creating swap' });
  }
};

// Get all swap requests involving the logged-in user
export const getMySwaps = async (req, res) => {
  try {
    const swaps = await SwapRequest.find({
      $or: [{ fromUser: req.user.id }, { toUser: req.user.id }]
    }).populate('fromUser toUser', 'name');

    res.status(200).json(swaps);
  } catch (error) {
    console.error("Get Swaps Error:", error);
    res.status(500).json({ msg: 'Server error while fetching swaps' });
  }
};

// Update the status of a swap request
export const updateSwapStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    const updatedSwap = await SwapRequest.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedSwap) {
      return res.status(404).json({ msg: 'Swap not found' });
    }

    res.status(200).json(updatedSwap);
  } catch (error) {
    console.error("Update Swap Error:", error);
    res.status(500).json({ msg: 'Server error while updating swap' });
  }
};

// Delete a pending swap request
export const deleteSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findOne({
      _id: req.params.id,
      fromUser: req.user.id,
      status: 'pending'
    });

    if (!swap) {
      return res.status(403).json({ msg: 'Not allowed to delete this swap' });
    }

    await SwapRequest.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: 'Swap deleted successfully' });
  } catch (error) {
    console.error("Delete Swap Error:", error);
    res.status(500).json({ msg: 'Server error while deleting swap' });
  }
};
