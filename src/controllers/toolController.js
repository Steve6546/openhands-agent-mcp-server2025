// src/controllers/toolController.js
const toolService = require('../services/toolService');

async function planTools(req, res) {
  const { projectType, requirements } = req.body;
  
  if (!projectType) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'The "projectType" parameter is required'
    });
  }

  const result = await toolService.executeTool('toolPlanner', { projectType, requirements });
  res.json(result);
}

module.exports = { planTools };