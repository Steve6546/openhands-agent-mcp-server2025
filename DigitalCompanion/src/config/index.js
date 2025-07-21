// src/config/index.js - إعدادات البيئة المركزية
require('dotenv').config();

module.exports = {
  // إعدادات الخادم
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  
  // إعدادات MCP
  mcp: {
    apiKey: process.env.MCP_API_KEY || null,
    timeout: parseInt(process.env.MCP_TIMEOUT) || 10000,
    retries: parseInt(process.env.MCP_RETRIES) || 3
  },
  
  // إعدادات الذاكرة
  memory: {
    dbPath: process.env.MEMORY_DB_PATH || './memory.json',
    maxEntries: parseInt(process.env.MEMORY_MAX_ENTRIES) || 1000,
    cleanupInterval: parseInt(process.env.MEMORY_CLEANUP_INTERVAL) || 3600000 // 1 hour
  },
  
  // إعدادات SSE
  sse: {
    keepAliveInterval: parseInt(process.env.SSE_KEEPALIVE) || 1000,
    maxConnections: parseInt(process.env.SSE_MAX_CONNECTIONS) || 100,
    timeout: parseInt(process.env.SSE_TIMEOUT) || 30000
  },
  
  // إعدادات الأمان
  security: {
    rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW) || 900000, // 15 minutes
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    corsOrigin: process.env.CORS_ORIGIN || '*'
  },
  
  // بيئة التشغيل
  env: process.env.NODE_ENV || 'development',
  
  // إعدادات اللوجنج
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || null
  }
};