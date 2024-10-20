// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const storyRoutes = require('./routes/story');
const characterRoutes = require('./routes/character');
const feedbackRoutes = require('./routes/feedback');

const limiter = require('./middleware/rateLimit');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security Middlewares
app.use(helmet());

// Data Sanitization against NoSQL Injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Rate Limiting
app.use(limiter);

// Logging
app.use(morgan('dev'));

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL, // e.g., 'http://localhost:3000'
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple Route
app.get('/', (req, res) => {
  res.send('Welcome to Circus AI Backend');
});

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/story', storyRoutes);
app.use('/api/character', characterRoutes);
app.use('/api/feedback', feedbackRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  });

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optionally: Send a notification or log to an external service
  process.exit(1);
});

// Graceful Shutdown
const gracefulShutdown = () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);