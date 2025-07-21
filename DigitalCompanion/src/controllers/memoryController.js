// src/controllers/memoryController.js
const { storeMemory, fetchMemory } = require('../../tools/memoryManager');
const { withRetry, withFallback } = require('../../tools/resilienceAdvisor');
const config = require('../config');

async function storeMemoryHandler(req, res) {
  const { key, value } = req.body;
  
  if (!key || value === undefined) {
    return res.status(400).json({
      error: 'Missing required parameters',
      message: 'Both "key" and "value" parameters are required'
    });
  }

  try {
    await withRetry(() => storeMemory(key, value), { 
      retries: config.mcp.retries, 
      timeout: config.mcp.timeout 
    });
    
    res.json({
      success: true,
      tool: 'memoryManager',
      operation: 'store',
      message: 'Memory stored successfully',
      key,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const fallback = await withFallback('memory_store', { key, value }, error);
    res.json({
      success: false,
      tool: 'memoryManager',
      operation: 'store',
      fallback,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

async function fetchMemoryHandler(req, res) {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'The "query" parameter is required'
    });
  }

  try {
    const memories = await withRetry(() => fetchMemory(query), { 
      retries: config.mcp.retries, 
      timeout: config.mcp.timeout 
    });
    
    res.json({
      success: true,
      tool: 'memoryManager',
      operation: 'fetch',
      memories,
      count: memories.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const fallback = await withFallback('memory_fetch', { query }, error);
    res.json({
      success: false,
      tool: 'memoryManager',
      operation: 'fetch',
      fallback,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = { 
  storeMemory: storeMemoryHandler, 
  fetchMemory: fetchMemoryHandler 
};