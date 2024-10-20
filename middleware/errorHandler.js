// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Customize based on error type
    if (res.headersSent) {
      return next(err);
    }
  
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  };
  
  module.exports = errorHandler;