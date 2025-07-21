# 🚀 OpenHands Agent MCP Server

خادم MCP ذكي ومتطور يوفر 8 أدوات متخصصة للذكاء الاصطناعي لتطوير المشاريع البرمجية.

## ⚡ الميزات الرئيسية

- **8 أدوات ذكية** للتطوير والتحليل
- **معمارية احترافية** مع Controllers و Services منفصلة  
- **نظام SSE متقدم** للتحديثات المباشرة
- **معالجة أخطاء ذكية** مع آلية إعادة المحاولة
- **إدارة ذاكرة متطورة** مع تخزين ذكي
- **متوافق 100%** مع بروتوكول MCP

## 🛠️ الأدوات المتاحة

| الأداة | الوصف | نقطة النهاية |
|--------|--------|---------------|
| 🧠 **ideaGenerator** | توليد وتحليل الأفكار الإبداعية | `/mcp/idea` |
| 🏗️ **structureGenerator** | إنشاء هياكل المشاريع | `/mcp/structure` |
| 🔧 **toolPlanner** | اقتراح الأدوات المناسبة | `/mcp/tools` |
| 🎨 **uiBuilder** | بناء واجهات المستخدم | `/mcp/ui` |
| ✅ **testWriter** | كتابة الاختبارات التلقائية | `/mcp/tests` |
| 📦 **dependency_adder** | إدارة التبعيات بذكاء | `/mcp/dependency` |
| 💾 **memoryManager** | إدارة الذاكرة والبيانات | `/mcp/memory/*` |
| 🛡️ **resilienceAdvisor** | نظام المرونة والإعادة | *(مدمج)*

## 🚀 التشغيل السريع

```bash
# تشغيل الخادم
node index.js

# أو استخدام npm
npm start
```

الخادم سيعمل على: `http://localhost:3000`

## 📡 نقاط النهاية الجديدة

### 🔍 **معلومات النظام**
```bash
GET /mcp/health        # حالة النظام والأداء
GET /mcp/tools/list    # قائمة الأدوات المتاحة
GET /mcp/sse          # Server-Sent Events
```

### 🧠 **الأدوات الذكية**
```bash
POST /mcp/idea        # توليد الأفكار
POST /mcp/structure   # إنشاء هياكل المشاريع  
POST /mcp/tools       # اقتراح الأدوات
POST /mcp/ui          # بناء واجهات المستخدم
POST /mcp/tests       # كتابة الاختبارات
POST /mcp/dependency  # إدارة التبعيات
```

### 💾 **إدارة الذاكرة**
```bash
POST /mcp/memory/store    # تخزين البيانات
POST /mcp/memory/fetch    # استرجاع البيانات
```

## 🎯 أمثلة سريعة

### توليد فكرة مشروع
```bash
curl -X POST http://localhost:3000/mcp/idea \
  -H "Content-Type: application/json" \
  -d '{"idea":"منصة تعليمية ذكية"}'
```

### اقتراح الأدوات المناسبة
```bash
curl -X POST http://localhost:3000/mcp/tools \
  -H "Content-Type: application/json" \
  -d '{"projectType":"تطبيق ويب","requirements":["database","api"]}'
```

### فحص حالة النظام
```bash
curl http://localhost:3000/mcp/health
```

## ⚙️ إعداد OpenHands

في ملف `config.toml`:
```toml
[mcp]
shttp_servers = [
  { url = "https://openhands-agent-mcp-server.steve6546.repl.co/mcp", api_key = null }
]
sse_servers = [
  "https://openhands-agent-mcp-server.steve6546.repl.co/mcp/sse"
]
stdio_servers = [
  { name = "fetch", command = "uvx", args = ["mcp-server-fetch"] }
]
```

### 🔄 بروتوكول MCP الجديد

الخادم يدعم الآن بروتوكول MCP الرسمي:
- `POST /mcp/list_tools` - قائمة الأدوات بصيغة MCP
- `POST /mcp/call_tool` - تنفيذ الأدوات بصيغة MCP
- JSON-RPC 2.0 متوافق مع OpenHands

## 🔧 إعدادات متقدمة

### متغيرات البيئة
```bash
cp .env.example .env
# قم بتحديث .env حسب احتياجاتك
```

### إعدادات مخصصة
- **PORT**: منفذ الخادم (افتراضي: 3000)
- **MCP_API_KEY**: مفتاح API اختياري
- **MCP_TIMEOUT**: مهلة العمليات (افتراضي: 10 ثوان)
- **LOG_LEVEL**: مستوى التسجيل (info, debug, error)

## 📊 مراقبة الأداء

### معلومات النظام المباشرة
- استخدام الذاكرة والمعالج
- عدد الاتصالات النشطة
- حالة الأدوات والخدمات
- إحصائيات الأداء

### Server-Sent Events
```javascript
const eventSource = new EventSource('/mcp/sse');
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('System Update:', data);
};
```

## 🛡️ الأمان والموثوقية

- **معالجة أخطاء شاملة** مع رسائل واضحة
- **آلية إعادة المحاولة** للعمليات الفاشلة
- **نظام fallback** ذكي عند الأعطال
- **تسجيل شامل** للأنشطة والأحداث
- **حدود زمنية** لمنع التعليق

## 🔗 الروابط المهمة

- **المحلي**: http://localhost:3000
- **الخارجي**: https://openhands-agent-mcp-server.steve6546.repl.co
- **MCP Endpoint**: https://openhands-agent-mcp-server.steve6546.repl.co/mcp
- **المستودع**: https://github.com/Steve6546/openhands-agent-mcp-server

## 🎉 الحالة

✅ **جاهز للإنتاج** - مختبر ومحسن  
✅ **متوافق مع MCP** - يدعم جميع المعايير  
✅ **معمارية احترافية** - قابل للصيانة والتطوير  
✅ **أداء عالي** - مُحسن للسرعة والكفاءة  

---

**OpenHands Agent MCP Server** - خادم ذكي متطور للمطورين المحترفين 🚀