// routes/ai.js

const express = require('express');
const router = express.Router();

const { main } = require('../services/azureopenai'); // Import the main function from the service
const auth = require('../middleware/auth'); // JWT authentication middleware
const rateLimit = require('../middleware/rateLimit'); // Rate limiting middleware

// Apply authentication and rate limiting middleware to all routes in this router
router.use(auth);
router.use(rateLimit);

/**
 * @route   POST /api/ai/generate
 * @desc    Generate AI completions based on a prompt
 * @access  Protected
 */
router.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  // Validate the prompt
  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    // Call the main function with the provided prompt
    console.log('Generating AI completion...');
    const completions = await main(prompt); // Use the main function to generate the completion

    // Log and send the completions as a JSON response
    console.log('Completions:', completions);
    res.json({ completions });
  } catch (error) {
    console.error('Error generating completions:', error);

    // Handle specific Azure OpenAI errors if necessary
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    // Send a 500 status code for other errors
    res.status(500).json({ message: 'Error generating completion' });
  }
});

module.exports = router;