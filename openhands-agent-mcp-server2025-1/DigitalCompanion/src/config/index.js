
module.exports = {
  port: process.env.PORT || 3000,
  host: '0.0.0.0',
  
  // إعدادات MCP
  mcp: {
    version: '1.0.0',
    protocol: 'mcp',
    timeout: 30000,
    maxRetries: 3,
    tools: {
      enabled: true,
      count: 8
    }
  },
  
  // إعدادات الذاكرة
  memory: {
    dbPath: './memory.json',
    maxSize: '10mb',
    backup: true
  },
  
  // إعدادات الأمان
  security: {
    apiKey: process.env.MCP_API_KEY || null,
    corsEnabled: true,
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 دقيقة
      max: 100 // حد أقصى 100 طلب لكل نافذة زمنية
    }
  },
  
  // إعدادات السجلات
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'combined',
    timestamp: true
  },
  
  // إعدادات SSE
  sse: {
    heartbeat: 5000,
    timeout: 30000,
    maxConnections: 100
  }
};
