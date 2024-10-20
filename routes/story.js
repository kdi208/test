// routes/story.js

const express = require('express');
const auth = require('../middleware/auth');
const azureopenai = require('../services/azureopenai');

const router = express.Router();

// Route to Start a New Story
router.post('/start', auth, async (req, res) => {
  try {
    const { fandom } = req.body;

    const prompt = `Create an engaging story in the ${fandom} universe.`;

    // Call OpenAI API
    const completion = await azureopenai.createCompletion({
      model: 'gpt-4o-mini',
      prompt,
      max_tokens: 500,
    });

    const story = completion.data.choices[0].text.trim();

    // Save story state to database (implement Story model)
    // ...

    res.json({ story });
  } catch (err) {
    res.status(500).json({ message: 'Failed to start story', error: err.message });
  }
});

// Route to Continue Story (Implement as needed)

module.exports = router;