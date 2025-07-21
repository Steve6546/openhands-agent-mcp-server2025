// src/controllers/ideaController.js
const toolService = require('../services/toolService');

async function generateIdea(req, res) {
  const { idea } = req.body;
  
  if (!idea) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'The "idea" parameter is required'
    });
  }

  const result = await toolService.executeTool('ideaGenerator', idea);
  res.json(result);
}

module.exports = { generateIdea };