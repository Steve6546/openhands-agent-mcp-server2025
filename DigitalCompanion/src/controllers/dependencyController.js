// src/controllers/dependencyController.js
const toolService = require('../services/toolService');

async function manageDependency(req, res) {
  const { framework, libs } = req.body;
  
  if (!framework) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'The "framework" parameter is required'
    });
  }

  const result = await toolService.executeTool('dependency_adder', { framework, libs });
  res.json(result);
}

module.exports = { manageDependency };