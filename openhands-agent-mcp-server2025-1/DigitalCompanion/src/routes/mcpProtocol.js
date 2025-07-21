// src/routes/mcpProtocol.js - MCP Protocol Integration
const express = require('express');
const router = express.Router();
const toolService = require('../services/toolService');

// MCP Protocol: List available tools
router.post('/list_tools', async (req, res) => {
  try {
    const tools = toolService.getAvailableTools();
    
    res.json({
      jsonrpc: "2.0",
      id: req.body.id || 1,
      result: {
        tools: tools.map(tool => ({
          name: tool.name,
          description: tool.description,
          inputSchema: {
            type: "object",
            properties: getToolSchema(tool.name)
          }
        }))
      }
    });
  } catch (error) {
    res.json({
      jsonrpc: "2.0",
      id: req.body.id || 1,
      error: {
        code: -32603,
        message: "Internal error",
        data: error.message
      }
    });
  }
});

// MCP Protocol: Execute tool
router.post('/call_tool', async (req, res) => {
  try {
    const { name, arguments: args } = req.body.params;
    
    let result;
    switch(name) {
      case 'ideaGenerator':
        result = await toolService.executeTool('ideaGenerator', args.idea);
        break;
      case 'structureGenerator':
        result = await toolService.executeTool('structureGenerator', args.tasks);
        break;
      case 'toolPlanner':
        result = await toolService.executeTool('toolPlanner', args);
        break;
      case 'uiBuilder':
        result = await toolService.executeTool('uiBuilder', args);
        break;
      case 'testWriter':
        result = await toolService.executeTool('testWriter', args);
        break;
      case 'dependency_adder':
        result = await toolService.executeTool('dependency_adder', args);
        break;
      case 'memoryManager':
        if (args.operation === 'store') {
          const { storeMemory } = require('../../tools/memoryManager');
          await storeMemory(args.key, args.value);
          result = { success: true, operation: 'store' };
        } else {
          const { fetchMemory } = require('../../tools/memoryManager');
          const memories = await fetchMemory(args.query);
          result = { success: true, operation: 'fetch', memories };
        }
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    res.json({
      jsonrpc: "2.0",
      id: req.body.id || 1,
      result: {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ],
        isError: false
      }
    });
  } catch (error) {
    res.json({
      jsonrpc: "2.0",
      id: req.body.id || 1,
      error: {
        code: -32602,
        message: "Invalid params",
        data: error.message
      }
    });
  }
});

function getToolSchema(toolName) {
  const schemas = {
    ideaGenerator: {
      idea: { type: "string", description: "فكرة المشروع المراد تحليلها وتطويرها" }
    },
    structureGenerator: {
      tasks: { type: "string", description: "المهام والمتطلبات لإنشاء هيكل المشروع" }
    },
    toolPlanner: {
      projectType: { type: "string", description: "نوع المشروع" },
      requirements: { type: "array", description: "متطلبات المشروع" }
    },
    uiBuilder: {
      component: { type: "string", description: "نوع المكون المراد إنشاؤه" },
      style: { type: "string", description: "نمط التصميم" },
      framework: { type: "string", description: "إطار العمل المستخدم" }
    },
    testWriter: {
      files: { type: "string", description: "الملفات المراد كتابة اختبارات لها" },
      testingFramework: { type: "string", description: "إطار الاختبار المستخدم" }
    },
    dependency_adder: {
      framework: { type: "string", description: "إطار العمل" },
      libs: { type: "array", description: "قائمة المكتبات المطلوبة" }
    },
    memoryManager: {
      operation: { type: "string", enum: ["store", "fetch"], description: "نوع العملية" },
      key: { type: "string", description: "مفتاح التخزين (للتخزين)" },
      value: { type: "string", description: "القيمة المراد تخزينها (للتخزين)" },
      query: { type: "string", description: "استعلام البحث (للاسترجاع)" }
    }
  };
  
  return schemas[toolName] || {};
}

module.exports = router;