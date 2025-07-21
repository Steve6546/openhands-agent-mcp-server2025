# 📘 دليل التكامل مع OpenHands - MCP Protocol Integration

## 🎯 الهدف من التكامل

هذا الخادم مصمم ليكون **وكيل MCP متكامل** مع OpenHands، يوفر 8 أدوات ذكية للذكاء الاصطناعي لإنشاء مشاريع برمجية حقيقية.

## 🔗 التكوين في OpenHands

### إعداد config.toml

```toml
[mcp]
# نقاط نهاية SHTTP للتواصل مع الأدوات
shttp_servers = [
  { url = "https://openhands-agent-mcp-server.steve6546.repl.co/mcp", api_key = null }
]

# نقاط نهاية SSE للتحديثات المباشرة
sse_servers = [
  "https://openhands-agent-mcp-server.steve6546.repl.co/mcp/sse"
]

# خوادم STDIO للعمليات المتقدمة
stdio_servers = [
  { name = "fetch", command = "uvx", args = ["mcp-server-fetch"] }
]
```

## 🛠️ الأدوات المتاحة

| الأداة | الوصف | نقطة النهاية |
|--------|--------|---------------|
| **ideaGenerator** | توليد وتحليل أفكار المشاريع | `/mcp/call_tool` |
| **structureGenerator** | إنشاء هياكل المشاريع | `/mcp/call_tool` |
| **toolPlanner** | اقتراح الأدوات المناسبة | `/mcp/call_tool` |
| **uiBuilder** | بناء واجهات المستخدم | `/mcp/call_tool` |
| **testWriter** | كتابة اختبارات تلقائية | `/mcp/call_tool` |
| **dependency_adder** | إدارة التبعيات | `/mcp/call_tool` |
| **memoryManager** | إدارة الذاكرة والبيانات | `/mcp/call_tool` |
| **resilienceAdvisor** | نظام المرونة والأمان | *(مدمج)*

## 📡 بروتوكول MCP

### 1. استعراض الأدوات المتاحة

```bash
POST /mcp/list_tools
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "list_tools"
}
```

**الاستجابة:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "ideaGenerator",
        "description": "توليد وتحليل الأفكار الإبداعية للمشاريع",
        "inputSchema": {
          "type": "object",
          "properties": {
            "idea": {
              "type": "string",
              "description": "فكرة المشروع المراد تحليلها وتطويرها"
            }
          }
        }
      }
    ]
  }
}
```

### 2. تنفيذ أداة

```bash
POST /mcp/call_tool
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "call_tool",
  "params": {
    "name": "ideaGenerator",
    "arguments": {
      "idea": "منصة تعليمية ذكية للبرمجة"
    }
  }
}
```

**الاستجابة:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\"success\": true, \"tool\": \"ideaGenerator\", \"result\": {...}}"
      }
    ],
    "isError": false
  }
}
```

## 🧠 أمثلة الاستخدام

### توليد فكرة مشروع

```json
{
  "name": "ideaGenerator",
  "arguments": {
    "idea": "تطبيق ذكي لإدارة المهام"
  }
}
```

### إنشاء هيكل مشروع

```json
{
  "name": "structureGenerator",
  "arguments": {
    "tasks": "إنشاء تطبيق React مع Node.js backend"
  }
}
```

### اقتراح الأدوات

```json
{
  "name": "toolPlanner",
  "arguments": {
    "projectType": "تطبيق ويب",
    "requirements": ["database", "authentication", "api"]
  }
}
```

### بناء واجهة مستخدم

```json
{
  "name": "uiBuilder",
  "arguments": {
    "component": "صفحة تسجيل دخول",
    "style": "modern",
    "framework": "React"
  }
}
```

### كتابة اختبارات

```json
{
  "name": "testWriter",
  "arguments": {
    "files": "src/auth.js",
    "testingFramework": "Jest"
  }
}
```

### إدارة التبعيات

```json
{
  "name": "dependency_adder",
  "arguments": {
    "framework": "React",
    "libs": ["axios", "styled-components", "react-router-dom"]
  }
}
```

### إدارة الذاكرة

**تخزين البيانات:**
```json
{
  "name": "memoryManager",
  "arguments": {
    "operation": "store",
    "key": "project_config",
    "value": "{\"name\": \"MyApp\", \"version\": \"1.0.0\"}"
  }
}
```

**استرجاع البيانات:**
```json
{
  "name": "memoryManager",
  "arguments": {
    "operation": "fetch",
    "query": "project_config"
  }
}
```

## 🔧 التحقق من التكامل

### 1. اختبار الاتصال
```bash
curl -X GET https://openhands-agent-mcp-server.steve6546.repl.co/mcp/health
```

### 2. اختبار قائمة الأدوات
```bash
curl -X POST https://openhands-agent-mcp-server.steve6546.repl.co/mcp/list_tools \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"list_tools"}'
```

### 3. اختبار تنفيذ أداة
```bash
curl -X POST https://openhands-agent-mcp-server.steve6546.repl.co/mcp/call_tool \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"call_tool","params":{"name":"ideaGenerator","arguments":{"idea":"تطبيق ذكي"}}}'
```

## 🌐 Server-Sent Events (SSE)

للحصول على تحديثات مباشرة:

```javascript
const eventSource = new EventSource(
  'https://openhands-agent-mcp-server.steve6546.repl.co/mcp/sse'
);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('System Update:', data);
};
```

## ✅ التحقق من النجاح

**علامات التكامل الناجح:**
- ✅ OpenHands يتعرف على الخادم
- ✅ قائمة الأدوات تظهر 7 أدوات متاحة
- ✅ تنفيذ الأدوات يعمل بنجاح
- ✅ SSE يبث التحديثات المباشرة
- ✅ استجابة سريعة للطلبات

## 🎯 القيمة المحققة

بعد التكامل الناجح، يصبح OpenHands قادراً على:
- توليد أفكار مشاريع إبداعية
- إنشاء هياكل مشاريع كاملة
- اقتراح الأدوات والتقنيات المناسبة
- بناء واجهات مستخدم تفاعلية
- كتابة اختبارات شاملة
- إدارة التبعيات تلقائياً
- حفظ واسترجاع معلومات المشروع

---

**🚀 الخادم جاهز للتكامل الكامل مع OpenHands!**