// src/middleware/errorHandler.js
// Catches anything passed to next(err) across the whole app

const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;