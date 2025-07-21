# 🚀 دليل النشر والتشغيل - OpenHands Agent MCP Server

## 📋 متطلبات النشر

### 1. البيئة المطلوبة
- **Node.js**: v16.0.0 أو أحدث
- **npm**: v8.0.0 أو أحدث  
- **Memory**: 512MB على الأقل
- **Storage**: 100MB للمشروع + dependencies

### 2. المنافذ المطلوبة
- **Port 3000**: المنفذ الأساسي للخادم
- **HTTPS**: مطلوب للاتصال مع OpenHands

## 🔧 خطوات النشر على Replit

### 1. إنشاء Repl جديد
```bash
# في Replit، اختر "Node.js" كقالب
# قم بتسمية المشروع: openhands-agent-mcp-server
```

### 2. رفع ملفات المشروع
```bash
# رفع جميع الملفات التالية:
├── index.js
├── package.json
├── package-lock.json
├── config.toml
├── memory.json
├── README.md
├── DEPLOYMENT.md
└── tools/
    ├── ideaGenerator.js
    ├── structureGenerator.js
    ├── toolPlanner.js
    ├── uiBuilder.js
    ├── testWriter.js
    ├── dependency_adder.js
    ├── memoryManager.js
    └── resilienceAdvisor.js
```

### 3. تثبيت التبعيات
```bash
npm install
```

### 4. التشغيل الأول للحصول على الرابط
```bash
node index.js
```

**النتيجة المتوقعة:**
```
MCP Backend listening on port 3000
```

**الرابط المولد:**  
`https://openhands-agent-mcp-server.steve6546.repl.co`

### 5. تحديث config.toml بالرابط الصحيح
```toml
[mcp]

# نقاط نهاية Streamable HTTP (SHTTP)
shttp_servers = [
  { url = "https://openhands-agent-mcp-server.steve6546.repl.co/mcp", api_key = "" }
]

# نقاط نهاية Server-Sent Events (SSE)
sse_servers = [
  "https://openhands-agent-mcp-server.steve6546.repl.co/mcp/sse"
]
```

### 6. إعادة التشغيل النهائي
```bash
# إيقاف الخادم (Ctrl+C)
# إعادة التشغيل
node index.js
```

## ✅ اختبار النشر

### 1. اختبار نقاط النهاية الأساسية
```bash
# اختبار توليد الأفكار
curl -X POST https://openhands-agent-mcp-server.steve6546.repl.co/mcp/idea \
  -H "Content-Type: application/json" \
  -d '{"idea":"منصة تعليمية للبرمجة"}'

# اختبار الذاكرة
curl -X POST https://openhands-agent-mcp-server.steve6546.repl.co/mcp/memory/store \
  -H "Content-Type: application/json" \
  -d '{"key":"test","value":"deployment successful"}'

# اختبار SSE
curl https://openhands-agent-mcp-server.steve6546.repl.co/mcp/sse
```

### 2. اختبار جميع الأدوات
| الأداة | الأمر | النتيجة المتوقعة |
|--------|-------|------------------|
| ideaGenerator | `/mcp/idea` | تحليل الفكرة وإنشاء خطة |
| structureGenerator | `/mcp/structure` | توليد هيكل المشروع |
| toolPlanner | `/mcp/tools` | اقتراح الأدوات المناسبة |
| uiBuilder | `/mcp/ui` | توليد مكونات واجهة المستخدم |
| testWriter | `/mcp/tests` | إنشاء اختبارات تلقائية |
| dependency_adder | `/mcp/dependency` | إدارة التبعيات |
| memoryManager | `/mcp/memory/*` | تخزين واسترجاع البيانات |
| resilienceAdvisor | (مدمج) | نظام إعادة المحاولة |

## 🔗 ربط الخادم مع OpenHands

### 1. إعداد OpenHands Client
```bash
# في terminal OpenHands، قم بتعديل الإعدادات:
export MCP_SERVER_URL="https://openhands-agent-mcp-server.steve6546.repl.co"
```

### 2. تحديث ملف إعدادات MCP
```json
{
  "mcpServers": {
    "openhands-agent": {
      "command": "node",
      "args": ["index.js"],
      "env": {
        "MCP_SERVER_URL": "https://openhands-agent-mcp-server.steve6546.repl.co"
      }
    }
  }
}
```

### 3. اختبار الاتصال
```bash
# من داخل OpenHands، جرب:
curl $MCP_SERVER_URL/mcp/sse
```

## 🛡️ أمان وصيانة

### 1. مراقبة الخادم
```bash
# فحص حالة الخادم
curl -I https://openhands-agent-mcp-server.steve6546.repl.co/mcp/sse

# فحص الذاكرة المستخدمة
curl https://openhands-agent-mcp-server.steve6546.repl.co/mcp/memory/fetch \
  -H "Content-Type: application/json" \
  -d '{"query":"system"}'
```

### 2. نسخ احتياطي للذاكرة
```bash
# تحميل ملف memory.json دورياً
# يحتوي على جميع البيانات المخزنة
```

### 3. تحديث الخادم
```bash
# في حالة تحديث الكود:
git pull origin main
npm install
node index.js
```

## 🚨 استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### 1. خطأ "EADDRINUSE"
```bash
# الحل: إيقاف العمليات السابقة
pkill -f "node index.js"
node index.js
```

#### 2. خطأ "Module not found"
```bash
# الحل: إعادة تثبيت التبعيات
rm -rf node_modules package-lock.json
npm install
```

#### 3. خطأ في نقطة نهاية MCP
```bash
# التحقق من config.toml
# التأكد من صحة الرابط
# إعادة تشغيل الخادم
```

#### 4. مشاكل في الذاكرة
```bash
# فحص ملف memory.json
# التأكد من وجود الملف وصحة البنية
# إعادة إنشاء الملف إذا لزم الأمر
```

## 📈 مراقبة الأداء

### 1. مؤشرات الأداء
- **Response Time**: < 2 ثانية لكل طلب
- **Memory Usage**: < 256MB في الوضع العادي
- **CPU Usage**: < 50% في الوضع العادي
- **Uptime**: > 99.5%

### 2. سجلات النظام
```bash
# عرض آخر سجلات الخادم
tail -f /tmp/server.log

# فحص استخدام الذاكرة
ps aux | grep "node index.js"
```

## 🎯 نصائح للأداء الأمثل

### 1. تحسين الاستجابة
- استخدام cache للطلبات المتكررة
- تقليل حجم JSON responses
- ضغط البيانات عند الإمكان

### 2. توفير الموارد
- تنظيف memory.json دورياً
- إزالة البيانات القديمة غير المستخدمة
- مراقبة استخدام المنافذ

### 3. الاستقرار
- استخدام PM2 أو Forever لإدارة العمليات
- إعداد صحة الخادم (health checks)
- تطبيق restart policies

---

✅ **المشروع جاهز للنشر والاستخدام مع OpenHands!**  
🔥 **جميع الأدوات مختبرة وتعمل بكفاءة عالية!**