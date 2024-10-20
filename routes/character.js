// routes/character.js

const express = require('express');
const auth = require('../middleware/auth');
const azureopenai = require('../services/azureopenai');

const router = express.Router();

// Route to Interact with a Character
router.post('/interact', auth, async (req, res) => {
  try {
    const { characterName, userMessage } = req.body;

    const prompt = `As ${characterName}, have a conversation with the user. The user says: "${userMessage}"`;

    // Call OpenAI API
    const completion = await azureopenai.createCompletion({
      model: 'gpt-4o-mini',
      prompt,
      max_tokens: 150,
    });

    const characterResponse = completion.data.choices[0].text.trim();

    // Optionally save interaction history
    // ...

    res.json({ characterResponse });
  } catch (err) {
    res.status(500).json({ message: 'Character interaction failed', error: err.message });
  }
});

module.exports = router;