// src/app.js - تهيئة Express والمiddlewares
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mcpRoutes = require('./routes/mcpRoutes');
const { errorHandler } = require('./middleware/errorHandler');
const { apiKeyMiddleware } = require('./middleware/apiKeyMiddleware');

const app = express();

// Middlewares أساسية
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware للتحقق من API Key (مُعطّل للتبسيط)
// app.use(apiKeyMiddleware);

// صفحة رئيسية تفاعلية للنظام الموحد
app.get('/', (req, res) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenHands Agent MCP Server</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; min-height: 100vh; 
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { font-size: 3em; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .header p { font-size: 1.2em; opacity: 0.9; }
        .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 25px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.2); }
        .card h3 { color: #ffd700; margin-bottom: 15px; font-size: 1.4em; }
        .card ul { list-style: none; }
        .card li { padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .card li:last-child { border-bottom: none; }
        .endpoints { background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px; margin-top: 20px; }
        .endpoints h3 { color: #4fc3f7; margin-bottom: 15px; }
        .endpoint { background: rgba(255,255,255,0.1); padding: 10px; margin: 8px 0; border-radius: 5px; font-family: monospace; cursor: pointer; transition: all 0.3s; }
        .endpoint:hover { background: rgba(255,255,255,0.2); transform: translateX(-5px); }
        .status { display: inline-block; width: 10px; height: 10px; background: #4caf50; border-radius: 50%; margin-left: 10px; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        .footer { text-align: center; margin-top: 40px; padding: 20px; background: rgba(0,0,0,0.2); border-radius: 10px; }
        .btn { display: inline-block; padding: 12px 24px; background: #4caf50; color: white; text-decoration: none; border-radius: 25px; margin: 10px; transition: all 0.3s; border: none; cursor: pointer; }
        .btn:hover { background: #45a049; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
        .test-section { background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin-top: 20px; }
        .test-area { display: flex; gap: 15px; margin-top: 15px; flex-wrap: wrap; }
        .test-input { flex: 1; min-width: 250px; padding: 10px; border: none; border-radius: 5px; background: rgba(255,255,255,0.9); color: #333; }
        .result { background: rgba(0,0,0,0.5); padding: 15px; border-radius: 5px; margin-top: 15px; font-family: monospace; font-size: 0.9em; max-height: 200px; overflow-y: auto; }
        .success { color: #4caf50; }
        .error { color: #f44336; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 OpenHands Agent MCP Server</h1>
            <p>نظام موحد ذكي مع 8 أدوات متطورة للتطوير <span class="status"></span></p>
        </div>
        
        <div class="cards">
            <div class="card">
                <h3>🛠️ الأدوات المتاحة</h3>
                <ul>
                    <li>🧠 توليد الأفكار الذكية</li>
                    <li>🏗️ إنشاء هياكل المشاريع</li>
                    <li>🔧 تخطيط الأدوات المناسبة</li>
                    <li>🎨 بناء واجهات المستخدم</li>
                    <li>✅ كتابة الاختبارات التلقائية</li>
                    <li>📦 إدارة التبعيات الذكية</li>
                    <li>💾 إدارة الذاكرة المتقدمة</li>
                    <li>🛡️ نظام المرونة والأمان</li>
                </ul>
            </div>
            
            <div class="card">
                <h3>⚡ المميزات الرئيسية</h3>
                <ul>
                    <li>معمارية MVC احترافية ✅</li>
                    <li>نظام SSE للتحديثات المباشرة ✅</li>
                    <li>معالجة أخطاء ذكية ✅</li>
                    <li>إدارة ذاكرة متطورة ✅</li>
                    <li>متوافق 100% مع MCP ✅</li>
                    <li>مراقبة الأداء المباشرة ✅</li>
                </ul>
            </div>
            
            <div class="card">
                <h3>📊 معلومات النظام</h3>
                <ul id="system-info">
                    <li>الحالة: تشغيل ✅</li>
                    <li>الإصدار: 1.0.0</li>
                    <li>المنفذ: 3000</li>
                    <li>البروتوكول: MCP</li>
                    <li>الوقت: ${new Date().toLocaleString('ar-SA')}</li>
                    <li>مدة التشغيل: ${Math.floor(process.uptime())} ثانية</li>
                </ul>
            </div>
        </div>
        
        <div class="test-section">
            <h3>🧪 اختبار الأدوات مباشرة</h3>
            <div class="test-area">
                <input type="text" class="test-input" id="ideaInput" placeholder="أدخل فكرة مشروع..." value="منصة تعليمية ذكية">
                <button class="btn" onclick="testIdea()">🧠 اختبار توليد الأفكار</button>
                <button class="btn" onclick="testHealth()">🔍 فحص الصحة</button>
                <button class="btn" onclick="testTools()">🛠️ قائمة الأدوات</button>
            </div>
            <div id="testResult" class="result" style="display: none;"></div>
        </div>
        
        <div class="endpoints">
            <h3>📡 نقاط النهاية المتاحة</h3>
            <div class="endpoint" onclick="testEndpoint('/mcp/health')">GET /mcp/health - حالة النظام والصحة</div>
            <div class="endpoint" onclick="testEndpoint('/mcp/tools/list')">GET /mcp/tools/list - قائمة الأدوات المتاحة</div>
            <div class="endpoint" onclick="window.open('/mcp/sse', '_blank')">GET /mcp/sse - Server-Sent Events</div>
            <div class="endpoint" onclick="alert('استخدم نموذج الاختبار أعلاه')">POST /mcp/idea - توليد الأفكار الذكية</div>
            <div class="endpoint" onclick="alert('استخدم API مباشرة')">POST /mcp/structure - إنشاء هياكل المشاريع</div>
            <div class="endpoint" onclick="alert('استخدم API مباشرة')">POST /mcp/tools - تخطيط الأدوات</div>
            <div class="endpoint" onclick="alert('استخدم API مباشرة')">POST /mcp/ui - بناء واجهات المستخدم</div>
            <div class="endpoint" onclick="alert('استخدم API مباشرة')">POST /mcp/tests - كتابة الاختبارات</div>
            <div class="endpoint" onclick="alert('استخدم API مباشرة')">POST /mcp/dependency - إدارة التبعيات</div>
            <div class="endpoint" onclick="alert('استخدم API مباشرة')">POST /mcp/memory/store - تخزين البيانات</div>
            <div class="endpoint" onclick="alert('استخدم API مباشرة')">POST /mcp/memory/fetch - استرجاع البيانات</div>
        </div>
        
        <div class="footer">
            <a href="/mcp/health" class="btn" target="_blank">🔍 فحص الصحة</a>
            <a href="/mcp/tools/list" class="btn" target="_blank">🛠️ قائمة الأدوات</a>
            <a href="/mcp/sse" class="btn" target="_blank">📡 SSE</a>
            <p style="margin-top: 20px; opacity: 0.8;">
                OpenHands Agent MCP Server - نظام موحد ذكي للمطورين المحترفين
            </p>
        </div>
    </div>

    <script>
        // تحديث معلومات النظام كل ثانية
        setInterval(updateSystemInfo, 1000);
        
        function updateSystemInfo() {
            const now = new Date();
            const uptime = Math.floor((Date.now() - startTime) / 1000);
            document.querySelector('.header p').innerHTML = 
                'نظام موحد ذكي مع 8 أدوات متطورة للتطوير <span class="status"></span> - ' + 
                now.toLocaleTimeString('ar-SA');
        }
        
        const startTime = Date.now();
        
        // اختبار نقاط النهاية
        async function testEndpoint(endpoint) {
            showResult('جاري الاختبار...', 'info');
            try {
                const response = await fetch(endpoint);
                const data = await response.json();
                showResult(JSON.stringify(data, null, 2), 'success');
            } catch (error) {
                showResult('خطأ: ' + error.message, 'error');
            }
        }
        
        async function testIdea() {
            const idea = document.getElementById('ideaInput').value;
            if (!idea) {
                showResult('الرجاء إدخال فكرة', 'error');
                return;
            }
            
            showResult('جاري توليد الأفكار...', 'info');
            try {
                const response = await fetch('/mcp/idea', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idea })
                });
                const data = await response.json();
                showResult(JSON.stringify(data, null, 2), 'success');
            } catch (error) {
                showResult('خطأ: ' + error.message, 'error');
            }
        }
        
        async function testHealth() {
            await testEndpoint('/mcp/health');
        }
        
        async function testTools() {
            await testEndpoint('/mcp/tools/list');
        }
        
        function showResult(text, type) {
            const resultDiv = document.getElementById('testResult');
            resultDiv.style.display = 'block';
            resultDiv.className = 'result ' + type;
            resultDiv.textContent = text;
        }
        
        // اختبار الاتصال بـ SSE
        try {
            const eventSource = new EventSource('/mcp/sse');
            eventSource.onopen = () => {
                console.log('✅ SSE متصل بنجاح');
                showResult('SSE متصل بنجاح ✅', 'success');
            };
            eventSource.onmessage = (event) => {
                console.log('📡 SSE Data:', JSON.parse(event.data));
            };
            eventSource.onerror = () => {
                console.log('⚠️ خطأ في اتصال SSE');
            };
        } catch (e) {
            console.log('⚠️ SSE غير متاح حالياً');
        }
    </script>
</body>
</html>`;
  
  res.send(htmlContent);
});

// تسجيل مسارات MCP
app.use('/mcp', mcpRoutes);

// معالجة الأخطاء
app.use(errorHandler);

// معالجة المسارات غير الموجودة
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: 'The requested endpoint does not exist',
    availableEndpoints: ['/mcp/*', '/']
  });
});

module.exports = app;