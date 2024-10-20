// routes/feedback.js

const express = require('express');
const auth = require('../middleware/auth');
const Feedback = require('../models/feedback');

const router = express.Router();

// Submit Feedback
router.post('/', auth, async (req, res) => {
  try {
    const { feedbackType, message } = req.body;

    const feedback = new Feedback({
      user: req.user,
      feedbackType,
      message,
    });

    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit feedback', error: err.message });
  }
});

module.exports = router;