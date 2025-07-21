// src/index.js - نقطة الدخول الرئيسية
const app = require('./app');
const config = require('./config');

const PORT = config.port || process.env.PORT || 3000;

// تشغيل الخادم
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 MCP Backend Server listening on port ${PORT}`);
  console.log(`📡 SSE Endpoint: http://localhost:${PORT}/mcp`);
  console.log(`🔗 MCP Base URL: http://localhost:${PORT}/mcp`);
});

// معالجة إيقاف التشغيل بأمان
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});

module.exports = server;