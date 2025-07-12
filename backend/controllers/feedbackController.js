import Feedback from "../models/Feedback.models.js";


export const giveFeedback = async (req, res) => {
  const { swapId, receivedBy, rating, comment } = req.body;
  const feedback = await Feedback.create({
    swapId,
    givenBy: req.user.id,
    receivedBy,
    rating,
    comment
  });
  res.json(feedback);
};

export const getFeedbackForUser = async (req, res) => {
  const feedbacks = await Feedback.find({ receivedBy: req.params.userId });
  res.json(feedbacks);
};