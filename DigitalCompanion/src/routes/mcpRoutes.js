// src/routes/mcpRoutes.js - مسارات MCP الرئيسية
const express = require('express');
const router = express.Router();

// Controllers
const ideaController = require('../controllers/ideaController');
const structureController = require('../controllers/structureController');
const toolController = require('../controllers/toolController');
const uiController = require('../controllers/uiController');
const testController = require('../controllers/testController');
const dependencyController = require('../controllers/dependencyController');
const memoryController = require('../controllers/memoryController');
const sseController = require('../controllers/sseController');

// Middleware للتعامل مع الأخطاء في المسارات
const asyncHandler = require('../middleware/asyncHandler');

// 1. توليد الأفكار وتحليلها
router.post('/idea', asyncHandler(ideaController.generateIdea));

// 2. توليد هيكل المشروع
router.post('/structure', asyncHandler(structureController.generateStructure));

// 3. تخطيط الأدوات المناسبة
router.post('/tools', asyncHandler(toolController.planTools));

// 4. بناء واجهة المستخدم
router.post('/ui', asyncHandler(uiController.buildUI));

// 5. كتابة الاختبارات
router.post('/tests', asyncHandler(testController.writeTests));

// 6. تثبيت وإدارة التبعيات
router.post('/dependency', asyncHandler(dependencyController.manageDependency));

// 7. إدارة الذاكرة - تخزين
router.post('/memory/store', asyncHandler(memoryController.storeMemory));

// 8. إدارة الذاكرة - استرجاع
router.post('/memory/fetch', asyncHandler(memoryController.fetchMemory));

// 9. Server-Sent Events للتحديثات المباشرة
router.get('/sse', sseController.handleSSE);

// 10. معلومات حول الأدوات المتاحة
const toolService = require('../services/toolService');

router.get('/tools/list', (req, res) => {
  const tools = toolService.getAvailableTools();
  res.json({
    tools,
    total: tools.length,
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 11. حالة النظام والأداء
router.get('/health', async (req, res) => {
  const health = await toolService.getSystemHealth();
  res.json({
    status: 'operational',
    ...health
  });
});

module.exports = router;