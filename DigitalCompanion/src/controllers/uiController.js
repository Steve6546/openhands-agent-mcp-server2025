// src/controllers/uiController.js
const toolService = require('../services/toolService');

async function buildUI(req, res) {
  const { component, style, framework } = req.body;
  
  if (!component) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'The "component" parameter is required'
    });
  }

  const result = await toolService.executeTool('uiBuilder', { component, style, framework });
  res.json(result);
}

module.exports = { buildUI };