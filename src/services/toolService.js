// src/services/toolService.js - خدمة الأدوات المركزية
const { withRetry, withFallback } = require('../../tools/resilienceAdvisor');
const config = require('../config');
const logger = require('../utils/logger');

class ToolService {
  constructor() {
    this.tools = new Map();
    this.loadTools();
  }

  loadTools() {
    // تحميل جميع الأدوات المتاحة
    const toolsMap = {
      ideaGenerator: require('../../tools/ideaGenerator'),
      structureGenerator: require('../../tools/structureGenerator'),
      toolPlanner: require('../../tools/toolPlanner'),
      uiBuilder: require('../../tools/uiBuilder'),
      testWriter: require('../../tools/testWriter'),
      dependency_adder: require('../../tools/dependency_adder'),
      memoryManager: require('../../tools/memoryManager'),
    };

    for (const [name, tool] of Object.entries(toolsMap)) {
      this.tools.set(name, tool);
      logger.debug(`Tool loaded: ${name}`);
    }

    logger.info(`Successfully loaded ${this.tools.size} tools`);
  }

  async executeTool(toolName, params) {
    const tool = this.tools.get(toolName);
    
    if (!tool) {
      throw new Error(`Tool not found: ${toolName}`);
    }

    logger.info(`Executing tool: ${toolName}`, { params });

    try {
      const result = await withRetry(
        () => this.runTool(tool, params),
        {
          retries: config.mcp.retries,
          timeout: config.mcp.timeout,
        }
      );

      logger.info(`Tool executed successfully: ${toolName}`);
      return {
        success: true,
        tool: toolName,
        result,
        timestamp: new Date().toISOString(),
        execution_time: Date.now() - this.startTime
      };
    } catch (error) {
      logger.error(`Tool execution failed: ${toolName}`, { error: error.message });
      
      const fallback = await withFallback(toolName, params, error);
      return {
        success: false,
        tool: toolName,
        fallback,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async runTool(tool, params) {
    this.startTime = Date.now();
    
    // تشغيل الأداة حسب نوعها
    if (typeof tool === 'function') {
      return await tool(params);
    } else if (tool.storeMemory && tool.fetchMemory) {
      // أداة الذاكرة لها وظائف متعددة
      return tool;
    } else {
      throw new Error('Invalid tool format');
    }
  }

  getAvailableTools() {
    return Array.from(this.tools.keys()).map(name => ({
      name,
      endpoint: `/mcp/${name.replace('_', '/').replace('Generator', '').replace('Planner', 's').replace('Builder', '').replace('Writer', 's').replace('Adder', '').toLowerCase()}`,
      status: 'active',
      description: this.getToolDescription(name)
    }));
  }

  getToolDescription(toolName) {
    const descriptions = {
      ideaGenerator: 'توليد وتحليل الأفكار الإبداعية للمشاريع',
      structureGenerator: 'إنشاء هياكل المشاريع المنظمة والاحترافية',
      toolPlanner: 'اقتراح الأدوات والتقنيات المناسبة للمشروع',
      uiBuilder: 'بناء وتصميم واجهات المستخدم التفاعلية',
      testWriter: 'كتابة الاختبارات التلقائية والشاملة',
      dependency_adder: 'إدارة وتثبيت التبعيات بذكاء',
      memoryManager: 'إدارة الذاكرة والبيانات بكفاءة عالية'
    };
    
    return descriptions[toolName] || 'أداة ذكية متخصصة';
  }

  async getSystemHealth() {
    const healthStatus = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        usage_percent: Math.round((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100)
      },
      tools: {
        total: this.tools.size,
        available: this.getAvailableTools().length,
        status: 'operational'
      },
      performance: {
        cpu_usage: process.cpuUsage(),
        platform: process.platform,
        node_version: process.version
      }
    };

    return healthStatus;
  }
}

module.exports = new ToolService();