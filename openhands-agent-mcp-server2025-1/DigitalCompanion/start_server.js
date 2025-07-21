#!/usr/bin/env node
// start_server.js - خادم مستقر مع إعادة تشغيل تلقائي

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

let serverProcess = null;
let restartCount = 0;
const maxRestarts = 5;

function startServer() {
  console.log(`🚀 بدء تشغيل الخادم... (المحاولة ${restartCount + 1})`);
  
  serverProcess = spawn('node', ['index.js'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    cwd: __dirname
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`[SERVER] ${data.toString().trim()}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`[ERROR] ${data.toString().trim()}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`⚠️ الخادم توقف بالكود: ${code}`);
    
    if (code !== 0 && restartCount < maxRestarts) {
      restartCount++;
      console.log(`🔄 إعادة تشغيل الخادم خلال 3 ثوان...`);
      setTimeout(startServer, 3000);
    } else if (restartCount >= maxRestarts) {
      console.error(`❌ تم الوصول للحد الأقصى من المحاولات (${maxRestarts})`);
      process.exit(1);
    }
  });

  serverProcess.on('error', (err) => {
    console.error(`❌ خطأ في تشغيل الخادم:`, err);
  });
}

// معالجة إيقاف التشغيل بأمان
process.on('SIGINT', () => {
  console.log('\n🛑 إيقاف الخادم...');
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM تم استلامه');
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }
  process.exit(0);
});

// بدء الخادم
startServer();