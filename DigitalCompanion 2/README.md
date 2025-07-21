# 🤖 OpenHands Agent MCP Server

نظام خادم ذكي مبني على **Model Context Protocol (MCP)** يوفر مجموعة شاملة من الأدوات الذكية لتطوير المشاريع البرمجية باستخدام Node.js و Express.js.

## 🎯 الهدف من المشروع

هذا المشروع يوفر **خادم MCP كامل** يمكن ربطه مع OpenHands أو أي نظام ذكي آخر لتوفير أدوات متخصصة في:
- توليد الأفكار وتحليلها
- إنشاء هياكل المشاريع
- اقتراح الأدوات المناسبة
- بناء واجهات المستخدم
- كتابة الاختبارات التلقائية
- إدارة التبعيات
- إدارة الذاكرة والتخزين

## 📁 هيكل المشروع

```
📁 openhands-agent-mcp-server/
│
├── 📁 tools/                    ← جميع أدوات الذكاء الصناعي (Agent Tools)
│   ├── ideaGenerator.js        ← أداة توليد الأفكار الأولية للمشروع
│   ├── structureGenerator.js   ← أداة توليد هيكل المشروع حسب الفكرة
│   ├── toolPlanner.js          ← أداة اقتراح الأدوات المناسبة للمشروع
│   ├── uiBuilder.js            ← أداة توليد تخطيط واجهة المستخدم (UI)
│   ├── testWriter.js           ← أداة توليد اختبارات تلقائية للكود
│   ├── dependency_adder.js     ← أداة إدارة وتثبيت التبعيات
│   ├── memoryManager.js        ← أداة استرجاع الذكريات والتحديثات السابقة
│   └── resilienceAdvisor.js    ← أداة تقوية المشروع ضد الأعطال والتكرار
│
├── index.js                    ← نقطة الدخول، يسجل جميع الأدوات كـ MCP Tools
├── memory.json                 ← قاعدة بيانات ذاكرة صغيرة (lowdb)
├── package.json                ← تعريف المشروع واسم الحزمة على Node.js
├── config.toml                 ← إعداد MCP لخادم خارجي (OpenHands client)
└── README.md                   ← هذا الملف (التوثيق)
```

## 🚀 كيفية التشغيل

### 1. تثبيت التبعيات
```bash
npm install
```

### 2. تشغيل الخادم
```bash
npm start
# أو
node index.js
```

### 3. التحقق من عمل الخادم
```bash
curl http://localhost:3000/mcp/sse
```

## 🔗 نقاط النهاية (API Endpoints)

| المسار | الطريقة | الوصف | الأداة المستخدمة |
|--------|---------|-------|-------------------|
| `/mcp/idea` | POST | توليد الأفكار وتحليلها | ideaGenerator |
| `/mcp/structure` | POST | توليد هيكل المشروع | structureGenerator |
| `/mcp/tools` | POST | تخطيط الأدوات المناسبة | toolPlanner |
| `/mcp/dependency` | POST | تثبيت وإدارة التبعيات | dependency_adder |
| `/mcp/ui` | POST | بناء واجهة المستخدم | uiBuilder |
| `/mcp/tests` | POST | كتابة الاختبارات | testWriter |
| `/mcp/memory/store` | POST | تخزين البيانات في الذاكرة | memoryManager |
| `/mcp/memory/fetch` | POST | استرجاع البيانات من الذاكرة | memoryManager |
| `/mcp/sse` | GET | Server-Sent Events للتحديثات المباشرة | - |

## 📋 أمثلة على الاستخدام

### 1. توليد فكرة مشروع
```bash
curl -X POST http://localhost:3000/mcp/idea \
  -H "Content-Type: application/json" \
  -d '{"idea":"منصة تعليمية للبرمجة"}'
```

### 2. اقتراح الأدوات المناسبة
```bash
curl -X POST http://localhost:3000/mcp/tools \
  -H "Content-Type: application/json" \
  -d '{"projectType":"تعليم","requirements":["mobile","realtime"]}'
```

### 3. بناء مكون واجهة مستخدم
```bash
curl -X POST http://localhost:3000/mcp/ui \
  -H "Content-Type: application/json" \
  -d '{"component":"login-form","style":"modern","framework":"react"}'
```

## ⚙️ إعداد MCP للربط مع OpenHands

### 1. تعديل ملف config.toml
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

### 2. ربط الخادم مع OpenHands
1. انسخ رابط الخادم بعد تشغيله
2. ضع الرابط في إعدادات OpenHands
3. تأكد من عمل جميع نقاط النهاية

## 🛠️ المتطلبات التقنية

- **Node.js**: v16+ 
- **Express.js**: v4.18+
- **Dependencies**:
  - `cors`: للطلبات المتقاطعة
  - `body-parser`: لمعالجة JSON
  - `axios`: للطلبات HTTP
  - `retry`: لآلية إعادة المحاولة
  - `lowdb`: لقاعدة البيانات المحلية
  - `moment`: للتعامل مع التواريخ
  - `lodash`: للوظائف المساعدة

## 🔧 ميزات متقدمة

### 1. نظام الذاكرة الذكي
- تخزين واسترجاع المعلومات تلقائياً
- البحث الذكي في الذكريات السابقة
- تنظيم البيانات بالوقت والأولوية

### 2. آلية المرونة والإعادة
- إعادة المحاولة التلقائية عند الفشل
- نظام fallback ذكي
- معالجة الأخطاء المتقدمة

### 3. دعم أنظمة التصميم المتعددة
- Modern, Minimal, Colorful designs
- دعم React, Vue, Angular
- توليد كود CSS/JavaScript تلقائياً

### 4. نظام اختبارات شامل
- دعم Jest و Mocha
- توليد اختبارات Unit و Integration
- قياس التغطية (Coverage) التلقائي

## 📊 حالة المشروع

✅ **مكتمل ومجرب** - جميع الأدوات تعمل بنجاح  
✅ **متوافق مع MCP** - يدعم جميع بروتوكولات MCP الأساسية  
✅ **جاهز للإنتاج** - تم اختبار جميع نقاط النهاية  
✅ **موثق بالكامل** - جميع الأدوات لها توثيق مفصل  

## 🤝 المساهمة

هذا المشروع مفتوح المصدر ومرحب بالمساهمات:

1. **Fork** المستودع
2. إنشاء **branch** جديد للميزة
3. **Commit** التغييرات
4. إرسال **Pull Request**

## 📞 الدعم والتواصل

- **المستودع**: https://github.com/Steve6546/openhands-agent-mcp-server
- **Issues**: لأي مشاكل أو اقتراحات
- **Wiki**: للتوثيق المفصل

---

🔥 **مشروع MCP Server كامل وجاهز للاستخدام مع OpenHands وأنظمة الذكاء الاصطناعي الأخرى!**