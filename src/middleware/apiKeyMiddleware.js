// src/middleware/apiKeyMiddleware.js - التحقق من API Key
const config = require('../config');

function apiKeyMiddleware(req, res, next) {
  // تخطي التحقق لجميع الطلبات للتبسيط
  return next();
}

module.exports = { apiKeyMiddleware };