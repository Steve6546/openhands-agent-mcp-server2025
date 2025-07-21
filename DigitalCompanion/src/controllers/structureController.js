// src/controllers/structureController.js
const toolService = require('../services/toolService');

async function generateStructure(req, res) {
  const { tasks } = req.body;
  
  if (!tasks) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'The "tasks" parameter is required'
    });
  }

  const result = await toolService.executeTool('structureGenerator', tasks);
  res.json(result);
}

module.exports = { generateStructure };