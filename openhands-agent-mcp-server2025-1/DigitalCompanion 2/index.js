// index.js
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const { withRetry, withFallback } = require('./tools/resilienceAdvisor');
const ideaGenerator       = require('./tools/ideaGenerator');
const structureGenerator  = require('./tools/structureGenerator');
const dependencyAdder     = require('./tools/dependency_adder');
const toolPlanner         = require('./tools/toolPlanner');
const uiBuilder           = require('./tools/uiBuilder');
const testWriter          = require('./tools/testWriter');
const { storeMemory, fetchMemory } = require('./tools/memoryManager');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Middleware للتحقق من API Key إن وُجدت
app.use((req, res, next) => {
  const cfgApiKey = process.env.MCP_API_KEY;  // إذا وضعت المفتاح كمتغيّر بيئة
  const reqKey    = req.headers['x-api-key'] || req.query.api_key;
  if (cfgApiKey && reqKey !== cfgApiKey) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  next();
});

// Utility: نضيف اسم الأداة في req.body.tool قبل المعالجة (لفالباك)
function wrap(toolName, handler) {
  return async (req, res) => {
    req.body.tool = toolName;
    try {
      const result = await withRetry(() => handler(req.body), { retries: 3, timeout: 5000 });
      res.json(result);
    } catch (err) {
      const fallback = await withFallback(toolName, req.body, err);
      res.json(fallback);
    }
  };
}

// 1) توليد الأفكار وتحليلها
app.post('/mcp/idea', wrap('ideaGenerator', async ({ idea }) => {
  return await ideaGenerator(idea);
}));

// 2) توليد هيكل المشروع
app.post('/mcp/structure', wrap('structureGenerator', async ({ tasks }) => {
  return await structureGenerator(tasks);
}));

// 3) تخطيط الأدوات المناسبة
app.post('/mcp/tools', wrap('toolPlanner', async ({ projectType, requirements }) => {
  return await toolPlanner(projectType, requirements);
}));

// 4) تثبيت الاعتمادات
app.post('/mcp/dependency', wrap('dependency_adder', async ({ framework, libs }) => {
  return await dependencyAdder(framework, libs);
}));

// 5) بناء واجهة المستخدم
app.post('/mcp/ui', wrap('uiBuilder', async ({ component, style, framework }) => {
  return await uiBuilder(component, style, framework);
}));

// 6) كتابة الاختبارات
app.post('/mcp/tests', wrap('testWriter', async ({ files, testingFramework }) => {
  return await testWriter(files, testingFramework);
}));

// 7) ذاكرة: تخزين
app.post('/mcp/memory/store', wrap('memory_store', async ({ key, value }) => {
  await storeMemory(key, value);
  return { status: 'ok' };
}));

// 8) ذاكرة: جلب
app.post('/mcp/memory/fetch', wrap('memory_fetch', async ({ query }) => {
  const mems = await fetchMemory(query);
  return { memories: mems };
}));

// SSE Health Check (مثال)
app.get('/mcp/sse', (req, res) => {
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type' : 'text/event-stream',
    'Connection'   : 'keep-alive'
  });
  let count = 0;
  const iv = setInterval(() => {
    res.write(`data: ${JSON.stringify({ timestamp: new Date().toISOString() })}\n\n`);
    if (++count >= 30) clearInterval(iv), res.end();
  }, 1000);
  req.on('close', () => clearInterval(iv));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`MCP Backend listening on port ${PORT}`));