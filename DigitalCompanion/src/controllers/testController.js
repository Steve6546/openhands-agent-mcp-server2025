// src/controllers/testController.js
const toolService = require('../services/toolService');

async function writeTests(req, res) {
  const { files, testingFramework } = req.body;
  
  if (!files) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'The "files" parameter is required'
    });
  }

  const result = await toolService.executeTool('testWriter', { files, testingFramework });
  res.json(result);
}

module.exports = { writeTests };