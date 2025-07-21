// src/middleware/errorHandler.js - معالجة الأخطاء المركزية
const config = require('../config');

function errorHandler(err, req, res, next) {
  // تسجيل الخطأ
  console.error('Error occurred:', {
    message: err.message,
    stack: config.env === 'development' ? err.stack : undefined,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // تحديد نوع الخطأ وإرسال استجابة مناسبة
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message,
      details: err.details || null
    });
  }

  if (err.name === 'UnauthorizedError' || err.status === 401) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid API key or authentication required'
    });
  }

  if (err.status === 404) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'The requested resource does not exist'
    });
  }

  if (err.name === 'TimeoutError') {
    return res.status(408).json({
      error: 'Request Timeout',
      message: 'The request took too long to process'
    });
  }

  // خطأ عام
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: config.env === 'development' ? err.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
}

module.exports = { errorHandler };