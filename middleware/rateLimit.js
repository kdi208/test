// middleware/rateLimiter.js

const rateLimit = require('express-rate-limit');

// Apply to all requests
const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX || 100,
    message:
        'Too many requests from this IP, please try again after 15 minutes',
    headers: true,
});

module.exports = limiter;