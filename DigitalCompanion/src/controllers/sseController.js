// src/controllers/sseController.js - Server-Sent Events controller
const config = require('../config');

let activeConnections = new Set();

function handleSSE(req, res) {
  // إعداد headers للـ SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  });

  // إضافة الاتصال للقائمة النشطة
  activeConnections.add(res);
  
  console.log(`📡 New SSE connection established. Active connections: ${activeConnections.size}`);

  // إرسال رسالة ترحيب
  res.write(`data: ${JSON.stringify({
    type: 'connection',
    message: 'Connected to MCP Server SSE',
    timestamp: new Date().toISOString(),
    server: 'OpenHands Agent MCP Server v1.0'
  })}\n\n`);

  // إرسال heartbeat دوري
  const heartbeatInterval = setInterval(() => {
    if (res.writableEnded) {
      clearInterval(heartbeatInterval);
      return;
    }
    
    res.write(`data: ${JSON.stringify({
      type: 'heartbeat',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      activeConnections: activeConnections.size
    })}\n\n`);
  }, config.sse.keepAliveInterval || 30000);

  // إرسال معلومات النظام كل دقيقة
  const systemInfoInterval = setInterval(() => {
    if (res.writableEnded) {
      clearInterval(systemInfoInterval);
      return;
    }

    res.write(`data: ${JSON.stringify({
      type: 'system_info',
      timestamp: new Date().toISOString(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      },
      uptime: Math.round(process.uptime()),
      activeConnections: activeConnections.size
    })}\n\n`);
  }, 60000);

  // معالجة إغلاق الاتصال
  req.on('close', () => {
    activeConnections.delete(res);
    clearInterval(heartbeatInterval);
    clearInterval(systemInfoInterval);
    console.log(`📡 SSE connection closed. Active connections: ${activeConnections.size}`);
  });

  // معالجة الأخطاء
  res.on('error', (err) => {
    console.error('SSE Error:', err);
    activeConnections.delete(res);
    clearInterval(heartbeatInterval);
    clearInterval(systemInfoInterval);
  });

  // إيقاف الاتصال بعد timeout محدد
  setTimeout(() => {
    if (!res.writableEnded) {
      res.write(`data: ${JSON.stringify({
        type: 'timeout',
        message: 'Connection timeout reached',
        timestamp: new Date().toISOString()
      })}\n\n`);
      res.end();
    }
  }, config.sse.timeout || 300000); // 5 minutes default
}

// إرسال رسالة لجميع الاتصالات النشطة
function broadcastToAll(data) {
  const message = `data: ${JSON.stringify({
    type: 'broadcast',
    ...data,
    timestamp: new Date().toISOString()
  })}\n\n`;

  activeConnections.forEach(res => {
    if (!res.writableEnded) {
      try {
        res.write(message);
      } catch (err) {
        console.error('Error broadcasting to SSE connection:', err);
        activeConnections.delete(res);
      }
    }
  });
}

// الحصول على عدد الاتصالات النشطة
function getActiveConnectionsCount() {
  return activeConnections.size;
}

module.exports = { 
  handleSSE, 
  broadcastToAll, 
  getActiveConnectionsCount 
};