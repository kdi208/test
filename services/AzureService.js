// services/AzureService.js

const { Configuration, AzureOpenAIAPI } = require('azureopenai');

const configuration = new Configuration({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
});

const azureopenai = new AzureOpenAIAPI(configuration);

module.exports = azureopenai;